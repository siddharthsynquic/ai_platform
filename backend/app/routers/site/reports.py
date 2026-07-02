"""Site report generation endpoints."""

from fastapi import APIRouter

router = APIRouter(prefix="/site/reports", tags=["site-reports"])

# TODO:
# POST /site/reports/generate       → generate (daily|weekly|snag|custom) → job id
# GET  /site/reports/{id}           → fetch rendered PDF/Excel
# GET  /site/reports                → list past reports
# POST /site/reports/schedule       → configure scheduled delivery
