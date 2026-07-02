"""Vector store interface — swap pgvector / Vertex / Pinecone / Qdrant without touching services."""

from dataclasses import dataclass
from typing import Any, Protocol


@dataclass(frozen=True)
class VectorHit:
    chunk_id: str
    score: float
    text: str
    metadata: dict[str, Any]


class VectorStore(Protocol):
    async def upsert(
        self,
        chunk_id: str,
        embedding: list[float],
        text: str,
        metadata: dict[str, Any],
        *,
        collection: str,
    ) -> None: ...

    async def upsert_batch(
        self,
        items: list[tuple[str, list[float], str, dict[str, Any]]],
        *,
        collection: str,
    ) -> None: ...

    async def search(
        self,
        embedding: list[float],
        *,
        collection: str,
        top_k: int = 10,
        filters: dict[str, Any] | None = None,
    ) -> list[VectorHit]: ...

    async def delete(self, chunk_id: str, *, collection: str) -> None: ...
