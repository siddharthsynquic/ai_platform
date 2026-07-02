"""Vector search facade — hybrid retrieval (dense + BM25) + cross-encoder rerank.

Per brief §5.1:
- Semantic (vector) + Keyword (BM25) + Metadata filter (stage/type/project)
- Re-rank top-N with cross-encoder before context assembly
- Returns VectorHit list with source citations
"""

# TODO: implement.
