"""RefreshToken ORM — rotating refresh tokens for JWT auth."""

# TODO: implement.
# Fields:
#   id, user_id (FK), token_hash (SHA256 of raw token), expires_at,
#   revoked_at, replaced_by_token_id, user_agent, ip, created_at
# Rotation: on refresh, mark current revoked + issue new (chained via replaced_by_token_id).
