# syntax=docker/dockerfile:1.7

# ────────────────────────────────────────────────────────────────
# Frontend — Vite build → nginx serve
# ────────────────────────────────────────────────────────────────

# ── Stage 1: build ──
FROM node:22-slim AS build

WORKDIR /app

# Install deps first (layer cache).
# Copy package.json ONLY — deliberately skip the lockfile because npm's
# optional-dep handling omits Linux-native binaries (like
# @rollup/rollup-linux-x64-gnu) when the lockfile was written on a
# Windows/macOS host. Fresh `npm install` inside Linux resolves the correct
# platform binaries reliably (npm bug #4828).
COPY package.json ./
RUN npm install --no-audit --no-fund

# Copy source
COPY . .

# Increase Node heap (large asset copy during build)
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm run build

# ── Stage 2: serve via nginx ──
FROM nginx:1.27 AS runtime

# SPA-friendly nginx config with API reverse proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets + heavy static (public/ was copied into dist/ by Vite build)
COPY --from=build /app/dist /usr/share/nginx/html

# Increase client body + static asset limits (some uploads are large)
RUN sed -i 's/# gzip/gzip/' /etc/nginx/nginx.conf || true

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
