"""Auth service — register / login / refresh / logout / me.

Flow:
- register:  hash password (Argon2) → persist User → issue token pair
- login:     verify password → issue token pair → store refresh token hash
- refresh:   verify+rotate refresh token → issue new pair
- logout:    revoke current refresh token (mark revoked_at)
- me:        fetch by current user id
"""

# TODO: implement using app.security.jwt + app.security.password + user_repo + refresh_repo.
