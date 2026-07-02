"""Arq worker settings — run: `arq app.jobs.worker.WorkerSettings`.

Handlers registered here are dispatched by ArqRedis client (see `queue.py`).
"""

# TODO: implement.
# from arq.connections import RedisSettings
# from app.core.config import get_settings
# from app.jobs.handlers import (
#     ingest_pdf, run_ocr, extract_elements, classify_stage,
#     chunk_and_embed, run_validation, generate_report,
#     send_email, dispatch_push,
# )
#
# _settings = get_settings()
#
# class WorkerSettings:
#     functions = [
#         ingest_pdf, run_ocr, extract_elements, classify_stage,
#         chunk_and_embed, run_validation, generate_report,
#         send_email, dispatch_push,
#     ]
#     redis_settings = RedisSettings.from_dsn(_settings.redis_url)
#     max_jobs = 10
#     job_timeout = 300
#     keep_result = 3600
