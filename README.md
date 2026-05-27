# Images Service

> Image library backend — filesystem indexing, metadata extraction, EXIF/RAW processing, organization

## Overview

Express 5 API for managing a personal image library. Indexes images from bind-mounted filesystem volumes, extracts EXIF metadata, generates thumbnails via Sharp, and provides browse/search/organize capabilities.

## Stack

- **Runtime**: Node.js 26 (Alpine)
- **Framework**: Express 5 via `@rodrigo-barraza/service-library`
- **Database**: MongoDB 7
- **Object Storage**: MinIO (thumbnails)
- **Image Processing**: Sharp (thumbnails, format conversion), ExifTool (metadata)
- **Secrets**: Vault Service (runtime bootstrap)

## API Routes

| Path          | Description                                  |
|---------------|----------------------------------------------|
| `/library`    | Browse, search, and query the image library  |
| `/images`     | Individual image CRUD operations             |
| `/thumbnails` | Generated thumbnail retrieval                |
| `/albums`     | Album creation, listing, management          |
| `/tags`       | Tag creation, listing, deletion              |
| `/metadata`   | EXIF/metadata viewing and editing            |
| `/health`     | Health check endpoint                        |

## Supported Formats

**Standard**: JPG, PNG, GIF, WebP, AVIF, BMP, TIFF, ICO, SVG
**RAW**: CR2, CR3, NEF, ARW, ORF, RW2, DNG, RAF, PEF, SRW
**HDR**: HDR, EXR
**Adobe**: PSD, PSB

## Development

```bash
npm install
npm run dev          # tsx watch mode
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run test         # vitest
```

## Deployment

```bash
npm run deploy              # full deploy to Synology NAS
npm run deploy -- --dry-run # validate without deploying
```
