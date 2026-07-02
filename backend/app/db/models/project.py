"""Project ORM — core scoping entity. Every drawing/observation belongs to a project."""

# TODO: implement.
# Fields:
#   id (UUID PK), code (unique, e.g. "ATX-OFF-023"), name, typology (office|residential|...),
#   client_name, address, gps_lat, gps_long, start_date, target_gfc_date,
#   status (planning|active|on_hold|completed), timestamps, deleted_at
# Related: users (many-to-many via project_members), pdf_documents, observations
