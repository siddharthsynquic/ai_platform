"""Assignment endpoints — assign observations to team/contractor with deadlines."""

from fastapi import APIRouter

router = APIRouter(prefix="/site/assignments", tags=["site-assignments"])

# TODO:
# POST /site/assignments                        → assign observation
# GET  /site/assignments/mine                   → current user's queue
# PATCH /site/assignments/{id}                  → update status/deadline
# GET  /site/assignments/overdue                → overdue list
