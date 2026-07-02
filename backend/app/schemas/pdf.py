from datetime import UTC, datetime

from pydantic import BaseModel, Field


class PdfMetadata(BaseModel):
    file_id: str
    filename: str
    size_bytes: int
    page_count: int
    title: str | None = None
    author: str | None = None
    subject: str | None = None
    keywords: str | None = None
    creator: str | None = None
    producer: str | None = None
    creation_date: str | None = None
    modification_date: str | None = None
    is_encrypted: bool = False
    uploaded_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class PdfUploadResponse(BaseModel):
    file_id: str
    filename: str
    size_bytes: int
    page_count: int
    stored_path: str


class PdfPageText(BaseModel):
    page_number: int
    text: str
    char_count: int


class PdfTextResponse(BaseModel):
    file_id: str
    filename: str
    page_count: int
    total_chars: int
    pages: list[PdfPageText]


class PdfImageInfo(BaseModel):
    page_number: int
    image_index: int
    width: int
    height: int
    format: str
    saved_path: str


class PdfImagesResponse(BaseModel):
    file_id: str
    filename: str
    image_count: int
    images: list[PdfImageInfo]


class PdfInfoResponse(BaseModel):
    file_id: str
    filename: str
    metadata: PdfMetadata
    page_dimensions: list[dict[str, float]]
