"""Speech-to-text provider — Site Agent voice notes → transcript."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class TranscriptResult:
    text: str
    language: str
    duration_seconds: float
    confidence: float
    segments: list[dict[str, object]] | None = None  # word-level timings


class SpeechProvider(Protocol):
    async def transcribe(
        self,
        audio: bytes,
        *,
        content_type: str = "audio/webm",
        language_hint: str = "en-IN",
    ) -> TranscriptResult: ...
