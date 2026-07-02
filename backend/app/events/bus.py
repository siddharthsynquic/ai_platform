"""Event bus — services publish domain events; consumers (WS manager, audit log, jobs) subscribe.

Single-process in-memory for dev. Swap to Redis pub/sub (or NATS) for multi-worker prod.
"""

from collections import defaultdict
from collections.abc import Awaitable, Callable
from typing import Any

from loguru import logger

Handler = Callable[[str, str, Any], Awaitable[None]]


class EventBus:
    def __init__(self) -> None:
        self._handlers: dict[str, list[Handler]] = defaultdict(list)

    def on(self, channel: str, handler: Handler) -> None:
        self._handlers[channel].append(handler)

    async def publish(self, channel: str, event: str, payload: Any) -> None:
        logger.debug("event: {} {} {}", channel, event, payload)
        for handler in self._handlers.get(channel, []):
            try:
                await handler(channel, event, payload)
            except Exception as exc:
                logger.exception("Event handler failed: {}", exc)


bus = EventBus()


async def _fanout_to_ws(channel: str, event: str, payload: Any) -> None:
    """Bridge — every published event forwarded to WS subscribers on same channel."""
    from app.ws.connection_manager import manager
    await manager.broadcast(channel, event, payload)


# TODO: bind in main.py lifespan or here at import time.
# for ch in ("ingestion:*", "validation:*", "site:*", "chat:*"):
#     bus.on(ch, _fanout_to_ws)
