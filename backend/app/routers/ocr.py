"""OCR endpoints — trigger OCR on specific PDF, fetch OCR text per page."""

from fastapi import APIRouter

router = APIRouter(prefix="/ocr", tags=["ocr"])

# TODO:
# POST   /ocr/{file_id}/run         → trigger OCR (async job)
# GET    /ocr/{file_id}/status      → job status
# GET    /ocr/{file_id}/pages/{n}   → OCR result per page
