from typing import Any, Generic, TypeVar
from uuid import uuid4

from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T | None = None
    error: dict[str, Any] | None = None
    meta: dict[str, Any] | None = None
    request_id: str = Field(default_factory=lambda: str(uuid4()))


def ok(data: T, meta: dict[str, Any] | None = None) -> ApiResponse[T]:
    return ApiResponse(success=True, data=data, meta=meta)


def fail(code: str, message: str, details: dict[str, Any] | None = None) -> ApiResponse[None]:
    return ApiResponse(
        success=False,
        error={"code": code, "message": message, "details": details or {}},
    )
