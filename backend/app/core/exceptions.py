"""Custom exception hierarchy — every service throws these, never bare exceptions.

Handlers in `exception_handlers.py` convert to ApiResponse envelope with correct HTTP status.
"""

from typing import Any


class AppException(Exception):
    """Base — all app-specific errors inherit."""

    status_code: int = 500
    code: str = "internal_error"
    default_message: str = "Internal server error"

    def __init__(
        self,
        message: str | None = None,
        *,
        details: dict[str, Any] | None = None,
        cause: Exception | None = None,
    ) -> None:
        self.message = message or self.default_message
        self.details = details or {}
        self.cause = cause
        super().__init__(self.message)


class NotFoundError(AppException):
    status_code = 404
    code = "not_found"
    default_message = "Resource not found"


class ValidationError(AppException):
    status_code = 422
    code = "validation_error"
    default_message = "Validation failed"


class UnauthorizedError(AppException):
    status_code = 401
    code = "unauthorized"
    default_message = "Authentication required"


class ForbiddenError(AppException):
    status_code = 403
    code = "forbidden"
    default_message = "Insufficient permissions"


class ConflictError(AppException):
    status_code = 409
    code = "conflict"
    default_message = "Resource conflict"


class RateLimitError(AppException):
    status_code = 429
    code = "rate_limit"
    default_message = "Too many requests"


class ExternalServiceError(AppException):
    """Upstream provider failed (Gemini, GCS, OCR API, etc)."""

    status_code = 502
    code = "external_service_error"
    default_message = "Upstream service failed"


# Domain-specific
class PdfProcessingError(AppException):
    status_code = 400
    code = "pdf_processing_error"
    default_message = "PDF processing failed"


class StorageError(AppException):
    status_code = 500
    code = "storage_error"
    default_message = "Storage operation failed"


class OcrError(ExternalServiceError):
    code = "ocr_error"
    default_message = "OCR provider failed"


class EmbeddingError(ExternalServiceError):
    code = "embedding_error"
    default_message = "Embedding provider failed"


class VectorStoreError(ExternalServiceError):
    code = "vector_store_error"
    default_message = "Vector store operation failed"
