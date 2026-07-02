"""Prompt template library — versioned, stage-aware, RAG-grounded.

Guidelines:
- One file per template family.
- Explicit `system` + `user` blocks.
- Use `{placeholders}` for variables — render via `.format(**ctx)` or Jinja2.
- Every template returns cited output referencing chunk/document IDs (brief §5.1).
"""
