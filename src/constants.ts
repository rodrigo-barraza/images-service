// ─── Constants ──────────────────────────────────────────────
// Application-wide enums, database collections, and file configurations

export const COLLECTIONS = {
  IMAGES: "images",
  ALBUMS: "albums",
  TAGS: "tags",
  METADATA: "metadata",
} as const;

export const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  // Standard raster formats
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".bmp",
  ".tiff",
  ".tif",
  ".ico",
  ".svg",

  // RAW camera formats
  ".cr2",
  ".cr3",
  ".nef",
  ".arw",
  ".orf",
  ".rw2",
  ".dng",
  ".raf",
  ".pef",
  ".srw",
  ".raw",

  // High dynamic range
  ".hdr",
  ".exr",

  // Adobe / design
  ".psd",
  ".psb",
]);

export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 200;
