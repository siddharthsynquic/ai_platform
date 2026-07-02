"""OCR provider interface — handles scanned PDF pages."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class OcrBox:
    text: str
    bbox: tuple[float, float, float, float]  # x0, y0, x1, y1
    confidence: float


@dataclass(frozen=True)
class OcrPageResult:
    page_number: int
    full_text: str
    boxes: list[OcrBox]
    language: str | None = None


class OcrProvider(Protocol):
    async def ocr_image(self, image_bytes: bytes, *, page_number: int) -> OcrPageResult: ...

    async def ocr_pdf_page(
        self, pdf_path: str, page_number: int, dpi: int = 300
    ) -> OcrPageResult: ...
