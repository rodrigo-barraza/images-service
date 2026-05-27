// ─── Configuration ──────────────────────────────────────────

import type { ImagesConfig } from "./types.ts";

const CONFIG: ImagesConfig = {
  IMAGES_SERVICE_PORT: parseInt(process.env.IMAGES_SERVICE_PORT ?? "", 10) || 5613,
  MONGODB_URI: process.env.MONGO_URI,
  MONGODB_DB_NAME: process.env.MONGO_DB_NAME || "images",

  // ── Image roots (bind-mounted from host, comma-separated) ──
  IMAGE_ROOTS: (process.env.IMAGES_IMAGE_ROOTS || "/media")
    .split(",")
    .map((path) => path.trim()),

  // ── Library scanning ────────────────────────────────────────
  SCAN_INTERVAL_MINUTES:
    parseInt(process.env.IMAGES_SCAN_INTERVAL_MINUTES ?? "", 10) || 60,

  // ── MinIO ───────────────────────────────────────────────────
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.IMAGES_MINIO_BUCKET || "images",
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL,

  // ── Auth ────────────────────────────────────────────────────
  AUTH_ENABLED: process.env.AUTH_ENABLED === "true",
};

export default CONFIG;
