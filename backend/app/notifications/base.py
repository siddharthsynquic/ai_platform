"""Notification provider interfaces — swap SES/SendGrid/FCM/APNS without touching services."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class EmailPayload:
    to: list[str]
    subject: str
    html_body: str
    text_body: str | None = None
    reply_to: str | None = None
    cc: list[str] | None = None
    bcc: list[str] | None = None
    attachments: list[dict[str, object]] | None = None  # [{filename, content_type, key}]


@dataclass(frozen=True)
class PushPayload:
    user_ids: list[str]
    title: str
    body: str
    data: dict[str, str] | None = None
    deep_link: str | None = None


class EmailProvider(Protocol):
    async def send(self, payload: EmailPayload) -> str: ...   # returns provider message id


class PushProvider(Protocol):
    async def send(self, payload: PushPayload) -> list[str]: ...
