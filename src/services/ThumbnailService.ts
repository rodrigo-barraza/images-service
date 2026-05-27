// ─── Thumbnail Service ──────────────────────────────────────
// Generates and serves image thumbnails via MinIO

import { MinioManager } from "@rodrigo-barraza/service-library";
import configuration from "../config.ts";
import logger from "../logger.ts";

export async function initializeMinio(): Promise<void> {
  if (!configuration.MINIO_ENDPOINT || !configuration.MINIO_ACCESS_KEY || !configuration.MINIO_SECRET_KEY) {
    logger.warn("MinIO not configured — thumbnail storage disabled");
    return;
  }

  await MinioManager.init({
    endpoint: configuration.MINIO_ENDPOINT,
    accessKey: configuration.MINIO_ACCESS_KEY,
    secretKey: configuration.MINIO_SECRET_KEY,
    bucket: configuration.MINIO_BUCKET,
    logger,
  });

  logger.info(`MinIO initialized — bucket: ${configuration.MINIO_BUCKET}`);
}
