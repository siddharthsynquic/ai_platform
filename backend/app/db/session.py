"""Async MongoDB client + database handle. Wire into config when persistence lands."""

from collections.abc import AsyncIterator

# TODO: implement when MongoDB persistence lands.
# from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
# from app.core.config import get_settings
#
# _settings = get_settings()
# _client: AsyncIOMotorClient | None = None
#
#
# def get_client() -> AsyncIOMotorClient:
#     global _client
#     if _client is None:
#         _client = AsyncIOMotorClient(_settings.mongo_url, uuidRepresentation="standard")
#     return _client
#
#
# def get_db() -> AsyncIOMotorDatabase:
#     return get_client()[_settings.mongo_db_name]


async def get_db_session() -> AsyncIterator[None]:  # type: ignore[misc]
    """FastAPI dependency — yields the Motor database handle once wired."""
    raise NotImplementedError("MongoDB not yet configured")
    yield None  # pragma: no cover
