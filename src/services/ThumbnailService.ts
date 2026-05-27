// ─── Thumbnail Service ──────────────────────────────────────
// Generates and serves image thumbnails via MinIO

import { initMinioClient, getMinioClient } from "@rodrigo-barraza/service-library";
import CONFIG from "../config.ts";
import logger from "../logger.ts";

export async function initMinio(): Promise<void> {
  if (!CONFIG.MINIO_ENDPOINT || !CONFIG.MINIO_ACCESS_KEY || !CONFIG.MINIO_SECRET_KEY) {
    logger.warn("MinIO not configured — thumbnail storage disabled");
    return;
  }

  await initMinioClient({
    endPoint: CONFIG.MINIO_ENDPOINT.replace(/^https?:\/\//, "").split(":")[0],
    port: parseInt(CONFIG.MINIO_ENDPOINT.split(":").pop() ?? "9000", 10),
    useSSL: CONFIG.MINIO_ENDPOINT.startsWith("https"),
    accessKey: CONFIG.MINIO_ACCESS_KEY,
    secretKey: CONFIG.MINIO_SECRET_KEY,
  });

  const minioClient = getMinioClient();
  const bucketExists = await minioClient.bucketExists(CONFIG.MINIO_BUCKET);

  if (!bucketExists) {
    await minioClient.makeBucket(CONFIG.MINIO_BUCKET);
    logger.info(`Created MinIO bucket: ${CONFIG.MINIO_BUCKET}`);
  }

  logger.info(`MinIO initialized — bucket: ${CONFIG.MINIO_BUCKET}`);
}
