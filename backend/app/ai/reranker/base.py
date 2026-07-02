"""Cross-encoder reranker — improves precision after initial vector retrieval.

Per brief §5.1: Hybrid retrieve → cross-encoder rerank → context assembly.
"""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class RerankScore:
    document_id: str
    score: float


class Reranker(Protocol):
    async def rerank(
        self,
        query: str,
        candidates: list[tuple[str, str]],  # [(doc_id, text)]
        *,
        top_k: int = 10,
    ) -> list[RerankScore]: ...
