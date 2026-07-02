# AI Platform Backend

Architerrax AI Platform — Python 3.12 + FastAPI. Starter setup for PDF ingestion, extraction, and metadata processing.

## Stack

- Python 3.12
- FastAPI + Uvicorn
- PyMuPDF (PDF parsing)
- Pydantic v2 + pydantic-settings
- pytest + httpx (tests)
- ruff + mypy (lint + typecheck)
- `uv` package manager

## Prerequisites

Install `uv` (recommended):

```bash
# Windows PowerShell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Setup

```bash
cd backend
cp .env.example .env
uv sync
```

## Run dev server

```bash
uv run uvicorn app.main:app --reload
```

Server: http://localhost:8000
Docs (Swagger): http://localhost:8000/docs

## Endpoints

Base prefix: `/api/v1`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Health check |
| POST | `/pdf/upload` | Upload PDF (multipart) |
| GET | `/pdf/{file_id}/info` | Metadata + page dimensions |
| GET | `/pdf/{file_id}/text` | Extract text per page |
| GET | `/pdf/{file_id}/images` | Extract embedded images |
| DELETE | `/pdf/{file_id}` | Delete PDF + extracted assets |

Response envelope: `{ success, data?, error?, meta?, request_id }`

## Tests

```bash
uv run pytest -v
```

## Lint / Typecheck

```bash
uv run ruff check .
uv run mypy .
```

## Folder layout

```
backend/
├── app/
│   ├── main.py                       # FastAPI factory + lifespan
│   ├── core/
│   │   ├── config.py                 # Pydantic Settings
│   │   ├── logging.py                # Loguru config
│   │   ├── exceptions.py             # ✅ AppException hierarchy
│   │   ├── exception_handlers.py     # ✅ global handlers → ApiResponse
│   │   ├── middleware.py             # ✅ RequestIdMiddleware + timing
│   │   ├── rate_limit.py             # 🔜 slowapi + Redis token bucket
│   │   ├── feature_flags.py          # ✅ phased rollout flags
│   │   └── health.py                 # ✅ deep readiness check
│   ├── routers/                      # HTTP layer (thin — validate → call service)
│   │   ├── health.py                 # ✅ liveness + readiness
│   │   ├── auth.py                   # 🔜 register/login/refresh/logout/me
│   │   ├── ws.py                     # ✅ /ws — pub/sub channels
│   │   ├── pdf.py                    # ✅ implemented
│   │   ├── ocr.py                    # 🔜 stub
│   │   ├── extraction.py             # 🔜 drawing element endpoints
│   │   ├── stage.py                  # 🔜 SD/DD/GFC classifier
│   │   ├── embeddings.py             # 🔜 chunk + embed trigger
│   │   ├── search.py                 # 🔜 hybrid RAG search
│   │   ├── validation.py             # 🔜 run stage validation
│   │   └── site/                     # ✅ System 02 scaffold
│   │       ├── observations.py       # 🔜 field capture
│   │       ├── pins.py               # 🔜 plan pins
│   │       ├── reports.py            # 🔜 report generation
│   │       ├── assignments.py        # 🔜 assign + deadlines
│   │       └── chatbot.py            # 🔜 site chatbot
│   ├── services/                     # Business logic
│   │   ├── pdf_service.py            # ✅ implemented
│   │   ├── ocr_service.py            # 🔜 detect scanned + run OCR
│   │   ├── extraction_service.py     # 🔜 rooms/dims/tags via multimodal
│   │   ├── stage_service.py          # 🔜 stage classifier
│   │   ├── chunking_service.py       # 🔜 semantic chunking
│   │   ├── embedding_service.py      # 🔜 batch embed
│   │   ├── vector_service.py         # 🔜 hybrid retrieve + rerank
│   │   ├── validation_service.py     # 🔜 stage rule engine
│   │   └── site/                     # ✅ System 02 services
│   │       ├── observation_service.py
│   │       ├── report_service.py
│   │       ├── assignment_service.py
│   │       └── chatbot_service.py
│   ├── repositories/                 # DB access (isolates ORM)
│   │   ├── pdf_repo.py
│   │   ├── chunk_repo.py
│   │   ├── element_repo.py
│   │   └── standard_detail_repo.py
│   ├── db/                           # ORM + session
│   │   ├── base.py                   # UUID PK + timestamps + soft delete
│   │   ├── session.py                # async engine + session factory
│   │   └── models/                   # PdfDocument, PdfPage, DrawingElement,
│   │                                 #  Chunk, StandardDetail, ValidationResult
│   ├── auth/                         # ✅ Auth foundation
│   │   ├── schemas.py                # Login/Register/Refresh DTOs
│   │   ├── service.py                # 🔜 register/login/refresh/logout
│   │   └── deps.py                   # ✅ CurrentUser + require_roles()
│   ├── security/                     # ✅ Crypto primitives
│   │   ├── password.py               # 🔜 Argon2 hasher
│   │   └── jwt.py                    # 🔜 access + refresh token pair
│   ├── ai/                           # External AI provider adapters
│   │   ├── llm/                      # LlmProvider + Gemini
│   │   ├── embeddings/               # EmbeddingProvider + gemini_embedder
│   │   ├── ocr/                      # OcrProvider + tesseract + document_ai
│   │   ├── vector_store/             # VectorStore + pgvector/qdrant/vertex
│   │   ├── speech/                   # ✅ SpeechProvider (Google Speech/Whisper)
│   │   ├── vision/                   # ✅ VisionProvider (Gemini multimodal)
│   │   ├── reranker/                 # ✅ Reranker (Cohere/BGE)
│   │   └── prompts/                  # ✅ Versioned template library
│   │       ├── stages/               # SD/DD/GFC validation prompts
│   │       ├── chatbot/              # Site chatbot prompt
│   │       ├── extraction/           # Drawing element extraction prompt
│   │       └── loader.py             # ✅ load + render (.md/.txt)
│   ├── jobs/                         # ✅ Async job queue (Arq + Redis)
│   │   ├── worker.py                 # 🔜 WorkerSettings
│   │   ├── queue.py                  # 🔜 arq pool client
│   │   └── handlers.py               # 🔜 job functions
│   ├── ws/                           # ✅ WebSocket infra
│   │   └── connection_manager.py     # per-channel fanout
│   ├── events/                       # ✅ Event bus
│   │   └── bus.py                    # publish → WS bridge
│   ├── notifications/                # ✅ Notification providers
│   │   ├── base.py                   # EmailProvider + PushProvider
│   │   ├── email_smtp.py             # 🔜 SMTP dev
│   │   ├── email_ses.py              # 🔜 AWS SES
│   │   ├── push_fcm.py               # 🔜 Firebase Cloud Messaging
│   │   └── templates.py              # 🔜 Jinja2 templates
│   ├── storage/                      # ✅ Storage provider abstraction
│   │   ├── base.py                   # StorageProvider Protocol
│   │   ├── local_storage.py          # ✅ local disk impl
│   │   ├── gcs_storage.py            # 🔜 Google Cloud Storage
│   │   └── s3_storage.py             # 🔜 AWS S3
│   ├── domain/                       # Enums, constants, rule catalog
│   │   ├── stages.py                 # ProjectStage (SD/DD/GFC)
│   │   ├── drawing_types.py          # DrawingType, Typology
│   │   ├── validation_rules.py       # Severity, RuleCategory
│   │   └── site/
│   │       └── enums.py              # ✅ IssueType, Severity, Status, Trade, Role
│   ├── pipelines/                    # Multi-step orchestration
│   │   ├── ingestion.py              # upload → OCR → extract → chunk → embed → index
│   │   └── validation.py             # rules → RAG → LLM narration → report
│   ├── schemas/                      # Pydantic DTOs
│   │   ├── pdf.py                    # ✅ implemented
│   │   ├── ocr.py                    # 🔜
│   │   ├── extraction.py             # 🔜
│   │   ├── stage.py                  # 🔜
│   │   ├── chunk.py                  # 🔜
│   │   ├── search.py                 # 🔜
│   │   └── validation.py             # 🔜
│   ├── migrations/                   # Alembic
│   │   ├── env.py
│   │   └── versions/
│   └── utils/
│       ├── response.py               # ApiResponse envelope
│       ├── pagination.py             # ✅ offset + cursor + Paginated<T>
│       └── filters.py                # ✅ shared query filter parsers
├── storage/
│   ├── uploads/                      # Uploaded PDFs
│   ├── extracted/
│   │   ├── images/                   # Embedded images from PDF
│   │   ├── text/                     # Extracted plain text dumps
│   │   └── ocr/                      # OCR outputs (per page)
│   └── standard_details/             # Standard Detail PDF library
├── tests/
├── alembic.ini
├── docker-compose.yml                # Postgres (pgvector) + Redis
├── pyproject.toml
└── .env.example
```

Legend: ✅ working today · 🔜 scaffolded (stubs + TODO)

## Layer rules

```
routers → services → repositories → db/models
                  ↘ ai/ (llm | embeddings | ocr | vector_store)  ← swappable providers
                  ↘ pipelines/ (multi-service orchestration)
```

Never skip, never reverse. Provider interfaces (Protocol) keep app cloud-agnostic.

## Layer rules

```
routers → services → (storage / pymupdf)
```

Never skip, never reverse. Routers handle HTTP concerns only. Services own PDF logic.

## Next up (post-starter)

- OCR (Tesseract / Google Document AI) for scanned drawings
- Drawing element extraction (rooms, dims, tags)
- Stage detection (SD / DD / GFC)
- Chunking + embeddings for RAG
- Vector store integration
- PostgreSQL for metadata persistence
