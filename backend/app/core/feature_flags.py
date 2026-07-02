"""Feature flags — phased rollout (SD first → DD → GFC → Phase 2 typologies).

Simple env-driven for now. Swap to Unleash / Flipt / GrowthBook for prod.
"""

from enum import StrEnum
from functools import lru_cache

from app.core.config import get_settings


class FeatureFlag(StrEnum):
    VALIDATION_SD = "validation_sd"
    VALIDATION_DD = "validation_dd"
    VALIDATION_GFC = "validation_gfc"
    SITE_AGENT = "site_agent"
    CHATBOT = "chatbot"
    OCR_DOCUMENT_AI = "ocr_document_ai"
    VECTOR_STORE_VERTEX = "vector_store_vertex"


@lru_cache
def _enabled_set() -> frozenset[str]:
    settings = get_settings()
    raw = getattr(settings, "feature_flags", "") or ""
    return frozenset(f.strip() for f in raw.split(",") if f.strip())


def is_enabled(flag: FeatureFlag) -> bool:
    return flag.value in _enabled_set()


def require(flag: FeatureFlag) -> None:
    if not is_enabled(flag):
        from app.core.exceptions import ForbiddenError
        raise ForbiddenError(f"Feature disabled: {flag.value}")
