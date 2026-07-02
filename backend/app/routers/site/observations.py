"""Site observation endpoints — field capture + retrieval."""

from fastapi import APIRouter

router = APIRouter(prefix="/site/observations", tags=["site-observations"])

# TODO:
# POST   /site/observations                     → create observation (multipart: photo/voice)
# GET    /site/observations                     → list (filters: project, status, severity, trade, date range)
# GET    /site/observations/{id}                → single observation with attachments + comments
# PATCH  /site/observations/{id}                → update status, tags
# DELETE /site/observations/{id}                → soft delete
# POST   /site/observations/{id}/attachments    → add photo/voice/doc
# POST   /site/observations/{id}/comments       → threaded comment
# POST   /site/observations/{id}/escalate       → flag critical
