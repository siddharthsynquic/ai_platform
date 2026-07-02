.PHONY: dev install lint typecheck test test-cov migrate worker docker-up docker-down clean

install:
	uv sync

dev:
	uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

worker:
	uv run arq app.jobs.worker.WorkerSettings

lint:
	uv run ruff check .

lint-fix:
	uv run ruff check --fix .

typecheck:
	uv run mypy .

test:
	uv run pytest -v

test-cov:
	uv run pytest -v --cov=app --cov-report=term-missing

migrate:
	uv run alembic upgrade head

migration:
	uv run alembic revision --autogenerate -m "$(name)"

check: lint typecheck test

docker-up:
	docker compose up -d

docker-down:
	docker compose down

clean:
	rm -rf .pytest_cache .mypy_cache .ruff_cache htmlcov .coverage
