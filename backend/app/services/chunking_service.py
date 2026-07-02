"""Semantic chunking — context-preserving segmentation for RAG.

Rules (from brief §5.1):
- Maintain drawing element boundaries (staircase detail = one chunk, never split)
- Include metadata per chunk: stage, drawing_type, project_id, element_id, detail_id
- Overlap: token-window overlap for context continuity
- Max chunk size tuned to embedding model context (~2048 tokens for text-embedding-004)
"""

# TODO: implement.
