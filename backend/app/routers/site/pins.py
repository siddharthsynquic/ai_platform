"""Floor plan pin endpoints — spatial index of observations on plan."""

from fastapi import APIRouter

router = APIRouter(prefix="/site/pins", tags=["site-pins"])

# TODO:
# GET /site/pins/plan/{pdf_id}                → all pins on a floor plan PDF page
# GET /site/pins/plan/{pdf_id}/heatmap        → aggregated density by cell
# PUT /site/pins/{pin_id}                     → reposition pin
