"""Auth endpoints — register, login, refresh, logout, me."""

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

# TODO:
# POST /auth/register  → RegisterRequest → TokenResponse
# POST /auth/login     → LoginRequest → TokenResponse
# POST /auth/refresh   → RefreshRequest → TokenResponse (rotates refresh token)
# POST /auth/logout    → 204 (revokes refresh token)
# GET  /auth/me        → UserResponse (requires access token)
