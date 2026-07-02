"""PdfDocument ORM model — one row per uploaded PDF."""

# TODO: implement when PostgreSQL persistence lands.
# from sqlalchemy import String, Integer, Boolean
# from sqlalchemy.orm import Mapped, mapped_column
# from app.db.base import Base, TimestampMixin, UuidPkMixin
# from app.domain.stages import ProjectStage
# from app.domain.drawing_types import DrawingType, Typology
#
# class PdfDocument(Base, UuidPkMixin, TimestampMixin):
#     __tablename__ = "pdf_documents"
#
#     filename: Mapped[str] = mapped_column(String(512), nullable=False)
#     storage_path: Mapped[str] = mapped_column(String(1024), nullable=False)
#     size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
#     page_count: Mapped[int] = mapped_column(Integer, nullable=False)
#     sha256: Mapped[str] = mapped_column(String(64), unique=True, index=True)
#     stage: Mapped[ProjectStage | None] = mapped_column(String(8), nullable=True, index=True)
#     drawing_type: Mapped[DrawingType | None] = mapped_column(String(64), nullable=True, index=True)
#     typology: Mapped[Typology | None] = mapped_column(String(32), nullable=True, index=True)
#     project_id: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)
#     revision: Mapped[str | None] = mapped_column(String(32), nullable=True)
#     is_standard_detail: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
#     ocr_completed: Mapped[bool] = mapped_column(Boolean, default=False)
#     embedding_completed: Mapped[bool] = mapped_column(Boolean, default=False)
