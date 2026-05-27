// ─── Types ──────────────────────────────────────────────────

export interface ImagesConfig {
  IMAGES_SERVICE_PORT: number;
  MONGODB_URI: string | undefined;
  MONGODB_DB_NAME: string;
  IMAGE_ROOTS: string[];
  SCAN_INTERVAL_MINUTES: number;
  MINIO_ENDPOINT: string | undefined;
  MINIO_ACCESS_KEY: string | undefined;
  MINIO_SECRET_KEY: string | undefined;
  MINIO_BUCKET: string;
  MINIO_PUBLIC_URL: string | undefined;
  AUTH_ENABLED: boolean;
}

// ─── Imports & Constants ─────────────────────────────────────

import { COLLECTIONS, SUPPORTED_IMAGE_EXTENSIONS } from "./constants.ts";
export { COLLECTIONS, SUPPORTED_IMAGE_EXTENSIONS };


// ── Image Database Document ─────────────────────────────────

export interface ImageDocument {
  _id?: string;
  filePath: string;
  fileName: string;
  fileExtension: string;
  fileSize: number;
  fileHash: string;
  directoryPath: string;
  width: number | null;
  height: number | null;
  format: string | null;
  colorSpace: string | null;
  hasAlpha: boolean;
  isAnimated: boolean;
  thumbnailUrl: string | null;

  // EXIF metadata
  exif: ExifMetadata | null;

  // Organization
  albums: string[];
  tags: string[];
  rating: number | null;
  isFavorite: boolean;

  // Timestamps
  dateTaken: Date | null;
  dateCreated: Date;
  dateModified: Date;
  dateIndexed: Date;
}

export interface ExifMetadata {
  make: string | null;
  model: string | null;
  lens: string | null;
  focalLength: number | null;
  aperture: number | null;
  shutterSpeed: string | null;
  iso: number | null;
  exposureCompensation: number | null;
  flash: string | null;
  whiteBalance: string | null;
  orientation: number | null;
  gpsLatitude: number | null;
  gpsLongitude: number | null;
  gpsAltitude: number | null;
  software: string | null;
  artist: string | null;
  copyright: string | null;
  description: string | null;
}

export interface AlbumDocument {
  _id?: string;
  name: string;
  description: string;
  coverImageId: string | null;
  imageCount: number;
  dateCreated: Date;
  dateModified: Date;
}

export interface TagDocument {
  _id?: string;
  name: string;
  color: string | null;
  imageCount: number;
  dateCreated: Date;
}
