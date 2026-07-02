"""Global exception handlers — convert exceptions to standard ApiResponse envelope."""

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.exceptions import AppException
from app.utils.response import fail


def _request_id(request: Request) -> str | None:
    return getattr(request.state, "request_id", None)


async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    body = fail(exc.code, exc.message, exc.details)
    body.request_id = _request_id(request) or body.request_id
    logger.warning(
        "AppException {code} {message} req={rid}",
        code=exc.code,
        message=exc.message,
        rid=body.request_id,
    )
    return JSONResponse(status_code=exc.status_code, content=body.model_dump())


async def http_exception_handler(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    body = fail(code=f"http_{exc.status_code}", message=str(exc.detail))
    body.request_id = _request_id(request) or body.request_id
    return JSONResponse(status_code=exc.status_code, content=body.model_dump())


async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    body = fail(
        code="validation_error",
        message="Request validation failed",
        details={"errors": exc.errors()},
    )
    body.request_id = _request_id(request) or body.request_id
    return JSONResponse(status_code=422, content=body.model_dump())


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    rid = _request_id(request)
    logger.exception("Unhandled exception req={rid}", rid=rid)
    body = fail(code="internal_error", message="Internal server error")
    if rid:
        body.request_id = rid
    return JSONResponse(status_code=500, content=body.model_dump())


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppException, app_exception_handler)  # type: ignore[arg-type]
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)  # type: ignore[arg-type]
    app.add_exception_handler(RequestValidationError, validation_exception_handler)  # type: ignore[arg-type]
    app.add_exception_handler(Exception, unhandled_exception_handler)
