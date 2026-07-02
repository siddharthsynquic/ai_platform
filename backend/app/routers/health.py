"""Health check endpoints — liveness + readiness."""

from fastapi import APIRouter

from app.core.health import check_all
from app.utils.response import ApiResponse, ok

router = APIRouter(tags=["health"])


@router.get("/health", response_model=ApiResponse[dict])
async def health() -> ApiResponse[dict]:
    """Liveness — process alive. Always cheap."""
    return ok({"status": "ok"})


@router.get("/health/ready", response_model=ApiResponse[dict])
async def readiness() -> ApiResponse[dict]:
    """Readiness — DB, Redis, vector store, storage all reachable."""
    report = await check_all()
    return ok(
        {
            "status": "ready" if report.overall else "degraded",
            "components": [
                {
                    "name": c.name,
                    "healthy": c.healthy,
                    "detail": c.detail,
                    "latency_ms": c.latency_ms,
                }
                for c in report.components
            ],
        }
    )
