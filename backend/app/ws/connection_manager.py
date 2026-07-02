"""WebSocket connection manager — per-channel fanout.

Frontend `WsClient` subscribes to channels like:
- `ingestion:{file_id}`     → pipeline progress
- `validation:{file_id}`    → validation report ready
- `site:project:{proj_id}`  → new observation events
- `chat:session:{sid}`      → streaming chatbot tokens
"""

from collections import defaultdict
from typing import Any

from fastapi import WebSocket
from loguru import logger


class ConnectionManager:
    def __init__(self) -> None:
        # channel → set of active sockets
        self._channels: dict[str, set[WebSocket]] = defaultdict(set)

    async def connect(self, ws: WebSocket, channels: list[str]) -> None:
        await ws.accept()
        for ch in channels:
            self._channels[ch].add(ws)

    def disconnect(self, ws: WebSocket) -> None:
        for subs in self._channels.values():
            subs.discard(ws)

    async def subscribe(self, ws: WebSocket, channel: str) -> None:
        self._channels[channel].add(ws)

    async def unsubscribe(self, ws: WebSocket, channel: str) -> None:
        self._channels[channel].discard(ws)

    async def broadcast(self, channel: str, event: str, payload: Any) -> None:
        subs = list(self._channels.get(channel, set()))
        if not subs:
            return
        message = {"channel": channel, "event": event, "payload": payload}
        for ws in subs:
            try:
                await ws.send_json(message)
            except Exception as exc:
                logger.warning("WS send failed: {}", exc)
                self.disconnect(ws)


manager = ConnectionManager()
