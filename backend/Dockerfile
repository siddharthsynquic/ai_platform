# syntax=docker/dockerfile:1.7

# ────────────────────────────────────────────────────────────────
# Backend — FastAPI + Uvicorn, dependencies via uv
# ────────────────────────────────────────────────────────────────
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# System deps: libmagic (python-magic), libglib (pymupdf), curl (healthcheck)
RUN apt-get update && apt-get install -y --no-install-recommends \
      libmagic1 \
      libgl1 \
      libglib2.0-0 \
      curl \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install uv (fast Python package manager)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# Install deps first (leverage Docker layer cache)
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# Copy source
COPY app ./app

# App storage volumes (mounted at runtime in compose)
RUN mkdir -p storage/uploads storage/extracted/images storage/extracted/text storage/extracted/ocr storage/standard_details

# Install project into venv
RUN uv sync --frozen --no-dev

# Non-root user
RUN useradd -m -u 10001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Healthcheck: /api/v1/health (200 OK)
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8000/api/v1/health || exit 1

# Bind 0.0.0.0 so nginx (or host) can reach it
CMD ["uv", "run", "--no-sync", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
