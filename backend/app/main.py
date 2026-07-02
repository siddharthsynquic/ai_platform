from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.core.config import get_settings
from app.core.exception_handlers import register_exception_handlers
from app.core.logging import configure_logging
from app.core.middleware import RequestIdMiddleware
from app.routers import (
    auth,
    embeddings,
    extraction,
    health,
    ocr,
    pdf,
    search,
    stage,
    validation,
    ws,
)
from app.routers.site import assignments, chatbot, observations, pins, reports


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    configure_logging(debug=settings.debug)
    logger.info(f"Starting {settings.app_name} (env={settings.app_env})")
    logger.info(f"Upload dir: {settings.upload_dir.resolve()}")
    logger.info(f"Extracted dir: {settings.extracted_dir.resolve()}")
    # TODO: initialise arq pool + event bus WS bridge here.
    yield
    logger.info("Shutting down")
    # TODO: close arq pool.


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        debug=settings.debug,
        lifespan=lifespan,
    )

    # Middleware order matters — RequestIdMiddleware first so all logs are correlated.
    app.add_middleware(RequestIdMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)

    # Health + Auth
    app.include_router(health.router, prefix=settings.api_v1_prefix)
    app.include_router(auth.router, prefix=settings.api_v1_prefix)

    # System 01 — Drawing Validation Engine
    app.include_router(pdf.router, prefix=settings.api_v1_prefix)
    app.include_router(ocr.router, prefix=settings.api_v1_prefix)
    app.include_router(extraction.router, prefix=settings.api_v1_prefix)
    app.include_router(stage.router, prefix=settings.api_v1_prefix)
    app.include_router(embeddings.router, prefix=settings.api_v1_prefix)
    app.include_router(search.router, prefix=settings.api_v1_prefix)
    app.include_router(validation.router, prefix=settings.api_v1_prefix)

    # System 02 — Site Agent
    app.include_router(observations.router, prefix=settings.api_v1_prefix)
    app.include_router(pins.router, prefix=settings.api_v1_prefix)
    app.include_router(reports.router, prefix=settings.api_v1_prefix)
    app.include_router(assignments.router, prefix=settings.api_v1_prefix)
    app.include_router(chatbot.router, prefix=settings.api_v1_prefix)

    # WebSocket (unprefixed — matches frontend WsClient default `/ws`)
    app.include_router(ws.router)

    return app


app = create_app()
