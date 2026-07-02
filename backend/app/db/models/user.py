"""User ORM — auth + role-based access control."""

# TODO: implement with PostgreSQL persistence.
# Fields:
#   id (UUID PK), email (unique, index), password_hash (Argon2),
#   full_name, role (site_agent|project_architect|admin),
#   is_active, is_email_verified, phone, avatar_key (StorageProvider),
#   last_login_at, timestamps, deleted_at (soft delete)
