"""Observation ORM — core Site Agent entity. One row per field capture."""

# TODO: implement with PostgreSQL persistence.
# Fields:
#   id, project_id (FK), captured_by_user_id (FK), input_type (photo|voice|text),
#   title, description, transcript (from voice STT), auto_description (from vision AI),
#   issue_type, severity, status, trade, construction_phase, responsible_party,
#   floor_level, zone, captured_at, resolved_at, deadline,
#   latitude, longitude, device_metadata (JSONB),
#   parent_observation_id (for time-series stacking on same pin)
