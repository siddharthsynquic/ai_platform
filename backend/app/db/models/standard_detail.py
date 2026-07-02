"""StandardDetail ORM model — versioned standard detail library entries."""

# TODO: implement with PostgreSQL persistence.
# Fields: id, pdf_document_id (FK), code (e.g. SD-STAIR-004), category (staircase|waterproofing|...),
#         element, applicable_stages (ARRAY of ProjectStage), typology, version, is_current,
#         summary, semantic_tags (JSONB)
# Unique: (code, version)
