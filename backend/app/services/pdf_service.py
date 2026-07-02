from __future__ import annotations

from pathlib import Path
from uuid import uuid4

import aiofiles
import pymupdf
from fastapi import UploadFile
from loguru import logger

from app.core.config import Settings
from app.core.exceptions import NotFoundError, PdfProcessingError
from app.schemas.pdf import (
    PdfImageInfo,
    PdfImagesResponse,
    PdfInfoResponse,
    PdfMetadata,
    PdfPageText,
    PdfTextResponse,
    PdfUploadResponse,
)


class PdfService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def save_upload(self, upload: UploadFile) -> tuple[str, Path]:
        if not upload.filename or not upload.filename.lower().endswith(".pdf"):
            raise PdfProcessingError("File must be a PDF")

        file_id = uuid4().hex
        target = self.settings.upload_dir / f"{file_id}.pdf"

        size = 0
        chunk_size = 1024 * 1024
        async with aiofiles.open(target, "wb") as out:
            while chunk := await upload.read(chunk_size):
                size += len(chunk)
                if size > self.settings.max_upload_size_bytes:
                    await out.close()
                    target.unlink(missing_ok=True)
                    raise PdfProcessingError(
                        f"File exceeds {self.settings.max_upload_size_mb} MB limit"
                    )
                await out.write(chunk)

        logger.info(f"Saved upload {upload.filename} → {target} ({size} bytes)")
        return file_id, target

    def _resolve_path(self, file_id: str) -> Path:
        path = self.settings.upload_dir / f"{file_id}.pdf"
        if not path.exists():
            raise NotFoundError(f"File not found: {file_id}")
        return path

    def _open(self, file_id: str) -> pymupdf.Document:
        path = self._resolve_path(file_id)
        try:
            return pymupdf.open(path)
        except Exception as exc:
            raise PdfProcessingError(f"Failed to open PDF: {exc}") from exc

    async def ingest(self, upload: UploadFile) -> PdfUploadResponse:
        file_id, path = await self.save_upload(upload)
        doc = self._open(file_id)
        try:
            page_count = doc.page_count
        finally:
            doc.close()

        return PdfUploadResponse(
            file_id=file_id,
            filename=upload.filename or f"{file_id}.pdf",
            size_bytes=path.stat().st_size,
            page_count=page_count,
            stored_path=str(path),
        )

    def get_metadata(self, file_id: str, filename: str | None = None) -> PdfInfoResponse:
        doc = self._open(file_id)
        try:
            raw = doc.metadata or {}
            page_dims = [
                {"page": i + 1, "width": p.rect.width, "height": p.rect.height}
                for i, p in enumerate(doc)
            ]
            path = self._resolve_path(file_id)

            metadata = PdfMetadata(
                file_id=file_id,
                filename=filename or path.name,
                size_bytes=path.stat().st_size,
                page_count=doc.page_count,
                title=raw.get("title") or None,
                author=raw.get("author") or None,
                subject=raw.get("subject") or None,
                keywords=raw.get("keywords") or None,
                creator=raw.get("creator") or None,
                producer=raw.get("producer") or None,
                creation_date=raw.get("creationDate") or None,
                modification_date=raw.get("modDate") or None,
                is_encrypted=doc.is_encrypted,
            )
            return PdfInfoResponse(
                file_id=file_id,
                filename=metadata.filename,
                metadata=metadata,
                page_dimensions=page_dims,
            )
        finally:
            doc.close()

    def extract_text(self, file_id: str, filename: str | None = None) -> PdfTextResponse:
        doc = self._open(file_id)
        try:
            pages: list[PdfPageText] = []
            total_chars = 0
            for i, page in enumerate(doc):
                text = page.get_text("text") or ""
                total_chars += len(text)
                pages.append(
                    PdfPageText(page_number=i + 1, text=text, char_count=len(text))
                )

            path = self._resolve_path(file_id)
            return PdfTextResponse(
                file_id=file_id,
                filename=filename or path.name,
                page_count=doc.page_count,
                total_chars=total_chars,
                pages=pages,
            )
        finally:
            doc.close()

    def extract_images(self, file_id: str, filename: str | None = None) -> PdfImagesResponse:
        doc = self._open(file_id)
        try:
            out_dir = self.settings.extracted_dir / file_id / "images"
            out_dir.mkdir(parents=True, exist_ok=True)

            images: list[PdfImageInfo] = []
            for page_index, page in enumerate(doc):
                for img_index, img in enumerate(page.get_images(full=True)):
                    xref = img[0]
                    try:
                        pix = pymupdf.Pixmap(doc, xref)
                        if pix.n - pix.alpha >= 4:
                            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)

                        ext = "png"
                        out_path = out_dir / f"p{page_index + 1}_i{img_index + 1}.{ext}"
                        pix.save(str(out_path))

                        images.append(
                            PdfImageInfo(
                                page_number=page_index + 1,
                                image_index=img_index + 1,
                                width=pix.width,
                                height=pix.height,
                                format=ext,
                                saved_path=str(out_path),
                            )
                        )
                        pix = None
                    except Exception as exc:
                        logger.warning(
                            f"Skipped image p{page_index + 1}_i{img_index + 1}: {exc}"
                        )

            path = self._resolve_path(file_id)
            return PdfImagesResponse(
                file_id=file_id,
                filename=filename or path.name,
                image_count=len(images),
                images=images,
            )
        finally:
            doc.close()

    def delete(self, file_id: str) -> bool:
        path = self.settings.upload_dir / f"{file_id}.pdf"
        if not path.exists():
            return False
        path.unlink()
        extracted = self.settings.extracted_dir / file_id
        if extracted.exists():
            for child in extracted.rglob("*"):
                if child.is_file():
                    child.unlink()
            for child in sorted(extracted.rglob("*"), reverse=True):
                if child.is_dir():
                    child.rmdir()
            extracted.rmdir()
        return True
