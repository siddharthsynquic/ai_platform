"""Pagination utilities — offset + cursor variants.

Every list endpoint uses one of these.
"""

from typing import Annotated, Generic, TypeVar
from uuid import UUID

from fastapi import Query
from pydantic import BaseModel, Field

T = TypeVar("T")


class OffsetPagination(BaseModel):
    """Offset pagination — simple, but slow at high offsets. Prefer cursor for large lists."""

    page: int = Field(1, ge=1)
    per_page: int = Field(20, ge=1, le=100)

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.per_page


def offset_params(
    page: Annotated[int, Query(ge=1)] = 1,
    per_page: Annotated[int, Query(ge=1, le=100)] = 20,
) -> OffsetPagination:
    return OffsetPagination(page=page, per_page=per_page)


class CursorPagination(BaseModel):
    """Cursor pagination — stable, fast. Cursor = last-seen id."""

    cursor: UUID | None = None
    limit: int = Field(20, ge=1, le=100)


def cursor_params(
    cursor: UUID | None = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
) -> CursorPagination:
    return CursorPagination(cursor=cursor, limit=limit)


class PageMeta(BaseModel):
    total: int | None = None    # None when cursor mode + unknown
    page: int | None = None
    per_page: int | None = None
    next_cursor: str | None = None
    has_more: bool = False


class Paginated(BaseModel, Generic[T]):
    items: list[T]
    meta: PageMeta
