"""Vector / hybrid search endpoints — RAG retrieval, precedent lookup, standard detail match."""

from fastapi import APIRouter

router = APIRouter(prefix="/search", tags=["search"])

# TODO:
# POST /search/semantic         → hybrid search across chunks (stage/type filters)
# POST /search/standard-detail  → error-to-detail matching
# POST /search/precedent        → similar past drawings within same stage
