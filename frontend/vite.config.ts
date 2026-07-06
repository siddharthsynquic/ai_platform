import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// All heavy site-agent assets are bundled into `frontend/public/` at build time
// (via Docker COPY or a local copy step) — Vite's default static-serve picks them
// up in dev and production. No external filesystem middleware needed here.

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        // Only precache the app shell + hashed bundles. NEVER precache the
        // heavy site-agent assets (2 GB of images/uploads/report HTML) —
        // they're runtime-cached instead (see runtimeCaching below).
        globPatterns: ["**/*.{js,css,html,ico,webmanifest}"],
        globIgnores: [
          "**/uploads/**",
          "**/reports/**",
          "**/site-data/images/**",
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/uploads\//,
          /^\/reports\//,
          /^\/site-data\/images\//,
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/uploads/") ||
              url.pathname.startsWith("/site-data/images/") ||
              url.pathname.startsWith("/reports/"),
            handler: "CacheFirst",
            options: {
              cacheName: "site-assets",
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    proxy: {
      // Dev only. In Docker prod, nginx reverse-proxies /api to the backend service.
      "/api": {
        target: process.env.VITE_API_TARGET || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    target: "es2022",
  },
});
