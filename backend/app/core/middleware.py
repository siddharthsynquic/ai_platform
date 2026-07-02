"""Middleware — request ID injection + timing.

RequestIdMiddleware:
- Reads incoming X-Request-ID or generates UUID
- Stores on request.state.request_id
- Binds to loguru contextvars for all logs in scope
- Echoes back as response header
"""

import time
from collections.abc import Awaitable, Callable
from uuid import uuid4

from loguru import logger
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

REQUEST_ID_HEADER = "X-Request-ID"


class RequestIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        request_id = request.headers.get(REQUEST_ID_HEADER) or uuid4().hex
        request.state.request_id = request_id

        start = time.perf_counter()
        with logger.contextualize(request_id=request_id):
            logger.info(
                "→ {method} {path}",
                method=request.method,
                path=request.url.path,
            )
            response = await call_next(request)
            duration_ms = (time.perf_counter() - start) * 1000
            logger.info(
                "← {method} {path} status={status} took={ms:.1f}ms",
                method=request.method,
                path=request.url.path,
                status=response.status_code,
                ms=duration_ms,
            )

        response.headers[REQUEST_ID_HEADER] = request_id
        response.headers["X-Response-Time-ms"] = f"{duration_ms:.1f}"
        return response
