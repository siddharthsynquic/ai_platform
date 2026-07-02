"""FastAPI auth dependencies — inject current user + enforce roles.

Usage:
  @router.get("/site/observations")
  async def list_obs(user: CurrentUser): ...

  @router.post("/admin/users", dependencies=[Depends(require_roles("admin"))])
  async def create_user(...): ...
"""

from typing import Annotated

from fastapi import Depends, Request

from app.core.exceptions import ForbiddenError, UnauthorizedError


class CurrentUserData:
    id: str
    email: str
    role: str


async def get_current_user(request: Request) -> CurrentUserData:
    """Extract user from Bearer token — decoded by AuthMiddleware / verified here."""
    # TODO: implement using app.security.jwt.decode(token, expected_type="access").
    raise UnauthorizedError("Auth not yet implemented")


CurrentUser = Annotated[CurrentUserData, Depends(get_current_user)]


def require_roles(*roles: str):
    async def _guard(user: CurrentUser) -> None:
        if user.role not in roles:
            raise ForbiddenError(f"Requires role: {roles}")

    return _guard
