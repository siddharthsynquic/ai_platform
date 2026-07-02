"""JWT encode/decode — access (15m) + refresh (7d) tokens.

Add `pyjwt[crypto]` to dependencies before wiring.
"""

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any


@dataclass(frozen=True)
class TokenPair:
    access_token: str
    refresh_token: str
    access_expires_at: datetime
    refresh_expires_at: datetime


class JwtError(Exception):
    pass


# TODO: implement using PyJWT.
# import jwt
# from app.core.config import get_settings
#
# ACCESS_TTL = timedelta(minutes=15)
# REFRESH_TTL = timedelta(days=7)
#
# def _now() -> datetime:
#     return datetime.now(timezone.utc)
#
# def encode(payload: dict[str, Any], *, ttl: timedelta) -> tuple[str, datetime]:
#     settings = get_settings()
#     exp = _now() + ttl
#     token = jwt.encode({**payload, "exp": exp, "iat": _now()},
#                        settings.jwt_secret, algorithm="HS256")
#     return token, exp
#
# def issue_pair(user_id: str, role: str) -> TokenPair:
#     access, access_exp = encode({"sub": user_id, "role": role, "typ": "access"}, ttl=ACCESS_TTL)
#     refresh, refresh_exp = encode({"sub": user_id, "typ": "refresh"}, ttl=REFRESH_TTL)
#     return TokenPair(access, refresh, access_exp, refresh_exp)
#
# def decode(token: str, *, expected_type: str) -> dict[str, Any]:
#     settings = get_settings()
#     try:
#         payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
#     except jwt.PyJWTError as exc:
#         raise JwtError(str(exc)) from exc
#     if payload.get("typ") != expected_type:
#         raise JwtError("Invalid token type")
#     return payload
