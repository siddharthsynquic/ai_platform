"""Base document model + mandatory fields (UUID id, timestamps, soft delete).

MongoDB collections use Pydantic v2 models as document schemas. Repositories
serialize via `model_dump(by_alias=True)` and read via `model_validate`.
"""

from datetime import datetime, timezone
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field


def _now() -> datetime:
    return datetime.now(timezone.utc)


class BaseDocument(BaseModel):
    """Shared mandatory fields — every collection document extends this."""

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={UUID: str, datetime: lambda d: d.isoformat()},
    )

    id: UUID = Field(default_factory=uuid4, alias="_id")
    created_at: datetime = Field(default_factory=_now)
    updated_at: datetime = Field(default_factory=_now)
    deleted_at: datetime | None = None
