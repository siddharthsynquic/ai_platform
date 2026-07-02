"""Storage provider layer — swap local disk / GCS / S3 without touching services."""

from app.storage.base import StorageProvider, StoredObject
from app.storage.local_storage import LocalStorage

__all__ = ["StorageProvider", "StoredObject", "LocalStorage"]
