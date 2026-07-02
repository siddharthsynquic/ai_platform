"""End-to-end ingestion pipeline: upload → OCR → extract → chunk → embed → index.

Steps:
1. PdfService.ingest        → save file, persist PdfDocument
2. StageService.classify    → stage + drawing_type + confidence
3. OcrService.run_if_needed → scanned page detection + OCR
4. ExtractionService.run    → rooms/dims/tags/schedules → DrawingElement rows
5. ChunkingService.chunk    → semantic chunks with metadata
6. EmbeddingService.embed   → text-embedding-004 batches
7. VectorStore.upsert_batch → dispatch to collection by stage

Async / background — dispatched via job queue (Celery / Arq / RQ — decide later).
Emits progress events for dashboard polling / WebSocket.
"""

# TODO: implement as async pipeline coordinator.
