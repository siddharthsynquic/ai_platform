"""ValidationResult ORM model — per-drawing validation report (errors, cautions, suggestions)."""

# TODO: implement with PostgreSQL persistence.
# Fields: id, pdf_document_id (FK), stage, ran_at, ruleset_version, summary (JSONB),
#         status (pending|passed|failed)
# Child: ValidationFlag rows — flag_id, category, severity, message, element_id, standard_detail_id,
#         precedent_document_id, bbox
