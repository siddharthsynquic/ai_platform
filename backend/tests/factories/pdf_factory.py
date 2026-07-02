"""Test factories — reusable object builders for tests.

Style: plain functions with sensible defaults + keyword overrides.
No `factory_boy` — keeps deps light; add if you need randomization at scale.
"""

from uuid import uuid4

import pymupdf


def make_sample_pdf(pages: int = 2, text_prefix: str = "Sample") -> bytes:
    """Build an in-memory PDF with N pages of text."""
    doc = pymupdf.open()
    for i in range(pages):
        page = doc.new_page()
        page.insert_text((72, 72), f"{text_prefix} — page {i + 1}")
    buf = doc.tobytes()
    doc.close()
    return buf


def make_multipage_pdf(*texts: str) -> bytes:
    doc = pymupdf.open()
    for t in texts:
        page = doc.new_page()
        page.insert_text((72, 72), t)
    buf = doc.tobytes()
    doc.close()
    return buf


def fake_uuid() -> str:
    return uuid4().hex
