"""WebSocket router — single `/ws` endpoint, client subscribes to channels."""

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect
from loguru import logger

from app.ws.connection_manager import manager

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    ws: WebSocket,
    token: str | None = Query(default=None),
) -> None:
    # TODO: validate token via app.security.jwt.decode(token, expected_type="access")
    # For now, allow anonymous connections during scaffolding.
    _ = token

    await manager.connect(ws, channels=[])
    try:
        while True:
            msg = await ws.receive_json()
            action = msg.get("action")
            channel = msg.get("channel")
            if action == "subscribe" and channel:
                await manager.subscribe(ws, channel)
            elif action == "unsubscribe" and channel:
                await manager.unsubscribe(ws, channel)
            elif action == "ping":
                await ws.send_json({"channel": "system", "event": "pong", "payload": {}})
    except WebSocketDisconnect:
        manager.disconnect(ws)
    except Exception as exc:
        logger.warning("WS error: {}", exc)
        manager.disconnect(ws)
