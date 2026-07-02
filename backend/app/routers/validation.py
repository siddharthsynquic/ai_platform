"""Validation endpoints — run stage-aware validation, fetch reports."""

from fastapi import APIRouter

router = APIRouter(prefix="/validation", tags=["validation"])

# TODO:
# POST /validation/{file_id}/run       → run SD/DD/GFC validation
# GET  /validation/{file_id}/report    → structured report (errors/cautions/suggestions)
# GET  /validation/{file_id}/flags     → paginated flag list
