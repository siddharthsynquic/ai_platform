"""Multi-tier rate limiting — per-IP + per-user + per-endpoint.

Add `slowapi` (or write custom Redis token-bucket) before wiring.
"""

# TODO: implement using slowapi + Redis backend.
# from slowapi import Limiter
# from slowapi.util import get_remote_address
#
# limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
#
# Usage in router:
#   @router.post("/auth/login")
#   @limiter.limit("5/minute")
#   async def login(request: Request, ...): ...
