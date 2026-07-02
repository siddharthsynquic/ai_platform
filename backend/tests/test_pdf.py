import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    assert body["data"]["status"] == "ok"


@pytest.mark.asyncio
async def test_upload_and_extract(client: AsyncClient, sample_pdf_bytes: bytes) -> None:
    resp = await client.post(
        "/api/v1/pdf/upload",
        files={"file": ("sample.pdf", sample_pdf_bytes, "application/pdf")},
    )
    assert resp.status_code == 201, resp.text
    upload = resp.json()["data"]
    file_id = upload["file_id"]
    assert upload["page_count"] == 2
    assert upload["size_bytes"] > 0

    info = await client.get(f"/api/v1/pdf/{file_id}/info")
    assert info.status_code == 200
    assert info.json()["data"]["metadata"]["page_count"] == 2

    text = await client.get(f"/api/v1/pdf/{file_id}/text")
    assert text.status_code == 200
    text_data = text.json()["data"]
    assert text_data["page_count"] == 2
    assert "Architerrax" in text_data["pages"][0]["text"]

    images = await client.get(f"/api/v1/pdf/{file_id}/images")
    assert images.status_code == 200

    delete = await client.delete(f"/api/v1/pdf/{file_id}")
    assert delete.status_code == 200
    assert delete.json()["data"]["deleted"] is True


@pytest.mark.asyncio
async def test_upload_rejects_non_pdf(client: AsyncClient) -> None:
    resp = await client.post(
        "/api/v1/pdf/upload",
        files={"file": ("bad.txt", b"not a pdf", "text/plain")},
    )
    assert resp.status_code == 400
    body = resp.json()
    assert body["success"] is False
    assert body["error"]["code"] == "pdf_processing_error"


@pytest.mark.asyncio
async def test_info_missing_file(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/pdf/deadbeef/info")
    assert resp.status_code == 404
    body = resp.json()
    assert body["error"]["code"] == "not_found"


@pytest.mark.asyncio
async def test_request_id_header_echoed(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/health", headers={"X-Request-ID": "test-req-42"})
    assert resp.status_code == 200
    assert resp.headers.get("X-Request-ID") == "test-req-42"
    assert resp.headers.get("X-Response-Time-ms")


@pytest.mark.asyncio
async def test_request_id_generated_when_missing(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/health")
    assert resp.status_code == 200
    assert resp.headers.get("X-Request-ID")
