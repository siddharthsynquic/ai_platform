"""OCR orchestration service — detects scanned pages, runs OCR, persists results."""

# TODO:
# - Detect if PDF page has extractable text (PyMuPDF `page.get_text()` empty check)
# - If scanned: rasterize page at 300 DPI, dispatch to OcrProvider
# - Persist OcrPageResult → PdfPage.ocr_text + OcrBox coords
# - Emit event for downstream extraction/chunking
