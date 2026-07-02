"""Object storage interface — files (PDFs, images, OCR outputs) live behind this."""

from collections.abc import AsyncIterator
from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class StoredObject:
    key: str            # storage key / relative path (e.g. "uploads/abc.pdf")
    uri: str            # absolute URI (file://... or gs://bucket/... or s3://bucket/...)
    size_bytes: int
    content_type: str | None = None
    etag: str | None = None


class StorageProvider(Protocol):
    async def put(
        self,
        key: str,
        data: bytes | AsyncIterator[bytes],
        *,
        content_type: str | None = None,
    ) -> StoredObject: ...

    async def get(self, key: str) -> bytes: ...

    async def stream(self, key: str, chunk_size: int = 1024 * 1024) -> AsyncIterator[bytes]: ...

    async def exists(self, key: str) -> bool: ...

    async def delete(self, key: str) -> bool: ...

    async def signed_url(self, key: str, *, expires_seconds: int = 3600) -> str: ...
