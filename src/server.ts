// ─── Entry Point ────────────────────────────────────────────

import { createService } from "@rodrigo-barraza/service-library";
import type { Application, Request, Response, NextFunction } from "express";
import CONFIG from "./config.ts";

// ─── Collection Setup ──────────────────────────────────────────
import { setupCollections } from "./services/LibraryService.ts";
import { initMinio } from "./services/ThumbnailService.ts";

// ─── Routes ────────────────────────────────────────────────────
import libraryRoutes from "./routes/LibraryRoutes.ts";
import imageRoutes from "./routes/ImageRoutes.ts";
import thumbnailRoutes from "./routes/ThumbnailRoutes.ts";
import albumRoutes from "./routes/AlbumRoutes.ts";
import tagRoutes from "./routes/TagRoutes.ts";
import metadataRoutes from "./routes/MetadataRoutes.ts";

// ─── Service Bootstrap ────────────────────────────────────────

await createService({
  name: "images-service",
  version: "0.1.0",
  port: CONFIG.IMAGES_SERVICE_PORT,
  description: "Image library backend — filesystem indexing, metadata extraction, EXIF/RAW processing, organization",
  mongo: {
    uri: CONFIG.MONGODB_URI!,
    dbName: CONFIG.MONGODB_DB_NAME,
  },
  routes: [
    { path: "/library", router: libraryRoutes },
    { path: "/images", router: imageRoutes },
    { path: "/thumbnails", router: thumbnailRoutes },
    { path: "/albums", router: albumRoutes },
    { path: "/tags", router: tagRoutes },
    { path: "/metadata", router: metadataRoutes },
  ],
  beforeRoutes: async (app: Application) => {
    // Expose headers needed for image streaming
    app.use((_req: Request, response: Response, next: NextFunction) => {
      response.header("Access-Control-Expose-Headers", "Content-Range, Accept-Ranges, Content-Length, Content-Type");
      next();
    });

    // Setup database collections and indexes
    await setupCollections();

    // Initialize MinIO for thumbnail storage
    await initMinio();
  },
  cron: [],
});
