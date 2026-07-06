# Architerrax AI Platform — Docker Deployment

Full-stack deployment via `docker compose`. Ships frontend (nginx), backend (FastAPI + uvicorn), MongoDB 7, and Redis 7.

---

## Ports (host → container)

| Service    | Host port  | Container port | Purpose                    |
| ---------- | ---------- | -------------- | -------------------------- |
| `frontend` | **3000**   | 80             | nginx serving Vite build   |
| `backend`  | **8000**   | 8000           | FastAPI + uvicorn          |
| `mongo`    | **27017**  | 27017          | MongoDB 7                  |
| `redis`    | **6379**   | 6379           | Redis 7                    |

Override any of these via `.env` (see `.env.example`):
```
FRONTEND_PORT=3000
BACKEND_PORT=8000
MONGO_PORT=27017
REDIS_PORT=6379
```

---

## Networking

All services join a shared bridge network **`ai_platform_net`**. They resolve each other by service name:

- Frontend nginx reverse-proxies `/api/*` → `http://backend:8000` (see `frontend/nginx.conf`).
- Frontend nginx reverse-proxies `/ws` → `http://backend:8000/ws` (WebSocket upgrade).
- Backend connects to MongoDB via `mongodb://mongo:mongo@mongo:27017/ai_platform?authSource=admin` (`MONGO_URL`).
- Backend connects to Redis via `redis://redis:6379/0` (`REDIS_URL`).

Client-facing entrypoint: **http://<host>:3000** — nginx serves the SPA and transparently proxies API + WebSocket traffic.

---

## Health checks

Every service has a healthcheck. `depends_on … condition: service_healthy` gates startup order.

- `mongo` — `mongosh --eval 'db.adminCommand({ ping: 1 })'`
- `redis` — `redis-cli ping`
- `backend` — `GET /api/v1/health`
- `frontend` — `wget /`

Inspect: `docker compose ps` shows health column.

---

## Quick start

```bash
# 1. (Optional) Copy env template
cp .env.example .env

# 2. Build + start
docker compose up -d --build

# 3. Watch logs
docker compose logs -f frontend backend

# 4. Open app
#    http://localhost:3000

# 5. Stop
docker compose down

# 6. Full reset (drops DB volume too)
docker compose down -v
```

---

## Where the heavy assets go

The `frontend` image bundles the site-agent reference data into its static output:

- `frontend/public/site-data/images/` — ~1.9 GB (2 356 site-report photos)
- `frontend/public/uploads/` — ~269 MB (report-builder photos + audio)
- `frontend/public/reports/` — ~26 MB (generated HTML reports + logo)
- `frontend/public/site-data/*.json` — `queries.json` (1.5 MB), `chat-history.json`, `reports.json`, `projects.json`

These are gitignored (`frontend/public/{site-data/images,uploads,reports}/`). Populate them on the deploy host **before** running `docker compose build` by copying from `client_reference_files/site_ai_agent_v2/ai agent/backend/`:

```bash
mkdir -p frontend/public/{uploads,reports,site-data/images}
cp -r 'client_reference_files/site_ai_agent_v2/ai agent/backend/uploads/.'          frontend/public/uploads/
cp -r 'client_reference_files/site_ai_agent_v2/ai agent/backend/reports/.'          frontend/public/reports/
cp -r 'client_reference_files/site_ai_agent_v2/ai agent/backend/site-data/images/.' frontend/public/site-data/images/
```

The Vite build then bakes them into `dist/`, which nginx serves.

---

## Common tweaks

- **Change frontend port**: `FRONTEND_PORT=8080 docker compose up -d`
- **Rebuild only frontend**: `docker compose build frontend && docker compose up -d frontend`
- **Shell into a container**: `docker compose exec backend bash`
- **Open a mongo shell**: `docker compose exec mongo mongosh -u mongo -p mongo --authenticationDatabase admin`
- **View backend logs only**: `docker compose logs -f backend`

---

## Notes for AWS / production hosts

- Point EC2/ALB `:80` (public) → host `:3000` (nginx container). TLS terminated at ALB.
- Persist `mongo_data`, `mongo_config`, and `backend_storage` volumes on EBS.
- Set strong `MONGO_PASSWORD` via secrets manager, not `.env`.
- Increase `client_max_body_size` in `frontend/nginx.conf` if uploads exceed 100 MB.
