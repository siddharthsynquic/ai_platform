from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_name: str = "AI Platform Backend"
    app_env: str = "development"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    host: str = "0.0.0.0"
    port: int = 8000

    # Storage
    upload_dir: Path = Path("./storage/uploads")
    extracted_dir: Path = Path("./storage/extracted")
    standard_details_dir: Path = Path("./storage/standard_details")
    max_upload_size_mb: int = 50

    # CORS
    cors_origins: list[str] = Field(
        default_factory=lambda: ["http://localhost:5173", "http://localhost:3000"]
    )

    # Database + Redis (wired when persistence lands)
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/ai_platform"
    redis_url: str = "redis://localhost:6379/0"

    # Auth / JWT
    jwt_secret: str = "change-me-in-env"
    jwt_algorithm: str = "HS256"
    jwt_access_ttl_minutes: int = 15
    jwt_refresh_ttl_days: int = 7

    # AI providers (wired when features land)
    gemini_api_key: str | None = None
    google_cloud_project: str | None = None
    vertex_location: str = "asia-south1"
    cohere_api_key: str | None = None

    # Feature flags (comma-separated)
    feature_flags: str = "validation_sd,site_agent"

    @property
    def max_upload_size_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    settings.extracted_dir.mkdir(parents=True, exist_ok=True)
    settings.standard_details_dir.mkdir(parents=True, exist_ok=True)
    return settings
