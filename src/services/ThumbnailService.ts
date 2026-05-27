// ─── Thumbnail Service ──────────────────────────────────────
// Generates and serves image thumbnails via MinIO

import { MinioManager } from "@rodrigo-barraza/service-library";
import CONFIG from "../config.ts";
import logger from "../logger.ts";

export async function initMinio(): Promise<void> {
  if (!CONFIG.MINIO_ENDPOINT || !CONFIG.MINIO_ACCESS_KEY || !CONFIG.MINIO_SECRET_KEY) {
    logger.warn("MinIO not configured — thumbnail storage disabled");
    return;
  }

  await MinioManager.init({
    endpoint: CONFIG.MINIO_ENDPOINT,
    accessKey: CONFIG.MINIO_ACCESS_KEY,
    secretKey: CONFIG.MINIO_SECRET_KEY,
    bucket: CONFIG.MINIO_BUCKET,
    logger,
  });

  logger.info(`MinIO initialized — bucket: ${CONFIG.MINIO_BUCKET}`);
}
