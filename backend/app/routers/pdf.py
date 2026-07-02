from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status

from app.core.config import Settings, get_settings
from app.schemas.pdf import (
    PdfImagesResponse,
    PdfInfoResponse,
    PdfTextResponse,
    PdfUploadResponse,
)
from app.services.pdf_service import PdfService
from app.utils.response import ApiResponse, ok

router = APIRouter(prefix="/pdf", tags=["pdf"])


def get_pdf_service(settings: Annotated[Settings, Depends(get_settings)]) -> PdfService:
    return PdfService(settings)


ServiceDep = Annotated[PdfService, Depends(get_pdf_service)]


@router.post(
    "/upload",
    response_model=ApiResponse[PdfUploadResponse],
    status_code=status.HTTP_201_CREATED,
)
async def upload_pdf(
    service: ServiceDep,
    file: UploadFile = File(..., description="PDF file to ingest"),
) -> ApiResponse[PdfUploadResponse]:
    return ok(await service.ingest(file))


@router.get("/{file_id}/info", response_model=ApiResponse[PdfInfoResponse])
async def get_pdf_info(file_id: str, service: ServiceDep) -> ApiResponse[PdfInfoResponse]:
    return ok(service.get_metadata(file_id))


@router.get("/{file_id}/text", response_model=ApiResponse[PdfTextResponse])
async def get_pdf_text(file_id: str, service: ServiceDep) -> ApiResponse[PdfTextResponse]:
    return ok(service.extract_text(file_id))


@router.get("/{file_id}/images", response_model=ApiResponse[PdfImagesResponse])
async def get_pdf_images(file_id: str, service: ServiceDep) -> ApiResponse[PdfImagesResponse]:
    return ok(service.extract_images(file_id))


@router.delete("/{file_id}", response_model=ApiResponse[dict])
async def delete_pdf(file_id: str, service: ServiceDep) -> ApiResponse[dict]:
    from app.core.exceptions import NotFoundError

    if not service.delete(file_id):
        raise NotFoundError(f"File not found: {file_id}")
    return ok({"file_id": file_id, "deleted": True})
