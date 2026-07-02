"""LLM provider interface — keeps app cloud-agnostic (Gemini/Claude/etc)."""

from typing import Protocol


class LlmProvider(Protocol):
    async def generate(
        self,
        prompt: str,
        *,
        system: str | None = None,
        temperature: float = 0.2,
        max_tokens: int = 2048,
    ) -> str: ...

    async def generate_multimodal(
        self,
        prompt: str,
        images: list[bytes],
        *,
        system: str | None = None,
        temperature: float = 0.2,
    ) -> str: ...
