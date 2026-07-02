"""User + auth factories — for future auth tests."""

from uuid import uuid4


def user_payload(**overrides: object) -> dict[str, object]:
    return {
        "email": overrides.get("email", f"user-{uuid4().hex[:8]}@synquic.com"),
        "password": overrides.get("password", "correct-horse-battery-staple"),
        "full_name": overrides.get("full_name", "Test User"),
        "role": overrides.get("role", "project_architect"),
    }
