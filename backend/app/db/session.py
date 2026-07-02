"""Async SQLAlchemy engine + session factory. Wire into config when DB is added."""

from collections.abc import AsyncIterator

# TODO: implement when PostgreSQL persistence lands.
# from sqlalchemy.ext.asyncio import (
#     AsyncSession,
#     async_sessionmaker,
#     create_async_engine,
# )
# from app.core.config import get_settings
#
# _settings = get_settings()
# engine = create_async_engine(_settings.database_url, pool_size=10, max_overflow=20)
# SessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_db_session() -> AsyncIterator[None]:  # type: ignore[misc]
    """FastAPI dependency — yields AsyncSession once wired."""
    raise NotImplementedError("Database not yet configured")
    yield None  # pragma: no cover
