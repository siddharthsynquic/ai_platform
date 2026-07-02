from collections.abc import AsyncIterator
from pathlib import Path

import pymupdf
import pytest
from httpx import ASGITransport, AsyncClient

from app.core.config import Settings, get_settings
from app.main import create_app


@pytest.fixture
def tmp_settings(tmp_path: Path) -> Settings:
    settings = Settings(
        upload_dir=tmp_path / "uploads",
        extracted_dir=tmp_path / "extracted",
        max_upload_size_mb=10,
    )
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    settings.extracted_dir.mkdir(parents=True, exist_ok=True)
    return settings


@pytest.fixture
async def client(tmp_settings: Settings) -> AsyncIterator[AsyncClient]:
    app = create_app()
    app.dependency_overrides[get_settings] = lambda: tmp_settings
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.fixture
def sample_pdf_bytes() -> bytes:
    doc = pymupdf.open()
    page = doc.new_page()
    page.insert_text((72, 72), "Hello Architerrax — SD stage sample")
    page2 = doc.new_page()
    page2.insert_text((72, 72), "Page 2 — DD stage draft")
    buf = doc.tobytes()
    doc.close()
    return buf
