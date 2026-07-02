"""Vision provider — auto-describe site photos + drawing element detection."""

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class VisionDescription:
    description: str
    tags: list[str]
    detected_objects: list[dict[str, object]]  # [{label, bbox, confidence}]
    text_regions: list[dict[str, object]] | None = None


class VisionProvider(Protocol):
    async def describe_image(
        self,
        image: bytes,
        *,
        content_type: str = "image/jpeg",
        prompt: str | None = None,
    ) -> VisionDescription: ...

    async def classify_site_photo(
        self,
        image: bytes,
    ) -> dict[str, str]:
        """Return {issue_type, severity, trade, construction_phase} classification."""
        ...
