"""Drawing element extraction endpoints — rooms, dims, tags, schedules."""

from fastapi import APIRouter

router = APIRouter(prefix="/extraction", tags=["extraction"])

# TODO:
# POST /extraction/{file_id}/run           → run element extraction
# GET  /extraction/{file_id}/elements      → list extracted elements
# GET  /extraction/{file_id}/pages/{n}     → per-page elements + bboxes
