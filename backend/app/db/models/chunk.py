"""Chunk ORM model — semantic chunk with embedding vector (pgvector)."""

# TODO: implement when pgvector integration lands.
# from pgvector.sqlalchemy import Vector
# Fields: id, pdf_document_id (FK), page_number, chunk_index, text,
#         embedding (Vector(768)), metadata (JSONB: stage, drawing_type, element_id, project_id)
# Indexes: HNSW on embedding, composite (stage, drawing_type)
