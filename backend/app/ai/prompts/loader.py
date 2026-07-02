"""Prompt loader — reads .md/.txt templates from `prompts/` and caches them."""

from functools import lru_cache
from pathlib import Path

PROMPTS_DIR = Path(__file__).parent


@lru_cache
def load(name: str) -> str:
    """Load prompt by relative path (e.g. `stages/sd_validation.md`)."""
    path = PROMPTS_DIR / name
    if not path.exists():
        raise FileNotFoundError(f"Prompt not found: {name}")
    return path.read_text(encoding="utf-8")


def render(name: str, **ctx: object) -> str:
    return load(name).format(**ctx)
