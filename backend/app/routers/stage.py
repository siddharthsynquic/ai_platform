"""Stage classifier endpoints — infer / override SD / DD / GFC on a PDF."""

from fastapi import APIRouter

router = APIRouter(prefix="/stage", tags=["stage"])

# TODO:
# POST /stage/{file_id}/classify   → infer stage + drawing_type + confidence
# PUT  /stage/{file_id}            → manual override (architect confirms)
