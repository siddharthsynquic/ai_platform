"""Embedding endpoints — trigger chunking + embedding, inspect chunks."""

from fastapi import APIRouter

router = APIRouter(prefix="/embeddings", tags=["embeddings"])

# TODO:
# POST /embeddings/{file_id}/run       → chunk + embed + upsert
# GET  /embeddings/{file_id}/chunks    → list chunks (paginated)
