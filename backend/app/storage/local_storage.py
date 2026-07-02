"""Local filesystem implementation of StorageProvider — dev + tests."""

from collections.abc import AsyncIterator
from pathlib import Path

import aiofiles

from app.core.exceptions import NotFoundError, StorageError
from app.storage.base import StoredObject


class LocalStorage:
    def __init__(self, root: Path) -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)

    def _abs(self, key: str) -> Path:
        # Prevent path traversal.
        target = (self.root / key).resolve()
        if not str(target).startswith(str(self.root.resolve())):
            raise StorageError(f"Invalid key: {key}")
        return target

    async def put(
        self,
        key: str,
        data: bytes | AsyncIterator[bytes],
        *,
        content_type: str | None = None,
    ) -> StoredObject:
        path = self._abs(key)
        path.parent.mkdir(parents=True, exist_ok=True)

        size = 0
        async with aiofiles.open(path, "wb") as out:
            if isinstance(data, bytes):
                await out.write(data)
                size = len(data)
            else:
                async for chunk in data:
                    size += len(chunk)
                    await out.write(chunk)

        return StoredObject(
            key=key,
            uri=path.resolve().as_uri(),
            size_bytes=size,
            content_type=content_type,
        )

    async def get(self, key: str) -> bytes:
        path = self._abs(key)
        if not path.exists():
            raise NotFoundError(f"Object not found: {key}")
        async with aiofiles.open(path, "rb") as f:
            return await f.read()

    async def stream(
        self, key: str, chunk_size: int = 1024 * 1024
    ) -> AsyncIterator[bytes]:
        path = self._abs(key)
        if not path.exists():
            raise NotFoundError(f"Object not found: {key}")
        async with aiofiles.open(path, "rb") as f:
            while chunk := await f.read(chunk_size):
                yield chunk

    async def exists(self, key: str) -> bool:
        return self._abs(key).exists()

    async def delete(self, key: str) -> bool:
        path = self._abs(key)
        if not path.exists():
            return False
        path.unlink()
        return True

    async def signed_url(self, key: str, *, expires_seconds: int = 3600) -> str:
        # Local storage has no signed URLs — return file:// URI.
        return self._abs(key).resolve().as_uri()
