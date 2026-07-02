"""Job ORM — persistent job record (mirrors Arq queue for UI polling + audit)."""

# TODO: implement.
# Fields:
#   id, arq_job_id (unique), type (ingest_pdf|ocr|extract|validation|...),
#   status (queued|in_progress|success|failed|retrying),
#   payload (JSONB), result (JSONB), error, progress_percent,
#   related_pdf_id, related_project_id, user_id (dispatcher),
#   started_at, completed_at, retry_count, timestamps
