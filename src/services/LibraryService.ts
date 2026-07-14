// ─── Library Service ────────────────────────────────────────
// Core business logic for image library indexing and querying

import { getDatabase } from "@rodrigo-barraza/utilities-library/service";
import { COLLECTIONS } from "../constants.ts";
import type { ImageDocument } from "../types.ts";
import logger from "../logger.ts";

export async function setupCollections(): Promise<void> {
  const database = getDatabase();

  const existingCollections = await database.listCollections().toArray();
  const existingCollectionNames = new Set(existingCollections.map((existingCollection: { name: string }) => existingCollection.name));

  for (const collectionName of Object.values(COLLECTIONS)) {
    if (!existingCollectionNames.has(collectionName)) {
      await database.createCollection(collectionName);
      logger.info(`Created collection: ${collectionName}`);
    }
  }

  // ── Indexes ──────────────────────────────────────────────────
  const imagesCollection = database.collection(COLLECTIONS.IMAGES);

  await imagesCollection.createIndex({ filePath: 1 }, { unique: true });
  await imagesCollection.createIndex({ fileHash: 1 });
  await imagesCollection.createIndex({ directoryPath: 1 });
  await imagesCollection.createIndex({ dateIndexed: -1 });
  await imagesCollection.createIndex({ dateTaken: -1 });
  await imagesCollection.createIndex({ isFavorite: 1 });
  await imagesCollection.createIndex({ rating: -1 });
  await imagesCollection.createIndex({ tags: 1 });
  await imagesCollection.createIndex({ albums: 1 });
  await imagesCollection.createIndex({ fileName: "text", "exif.description": "text" });

  logger.info("Database collections and indexes ready");
}

export async function getImageCount(): Promise<number> {
  const database = getDatabase();
  return database.collection(COLLECTIONS.IMAGES).countDocuments();
}

export async function getImages(
  page: number = 1,
  limit: number = 50,
  sortField: string = "dateIndexed",
  sortDirection: 1 | -1 = -1,
): Promise<{ images: ImageDocument[]; total: number }> {
  const database = getDatabase();
  const imagesCollection = database.collection<ImageDocument>(COLLECTIONS.IMAGES);

  const total = await imagesCollection.countDocuments();
  const images = await imagesCollection
    .find()
    .sort({ [sortField]: sortDirection })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { images, total };
}

export async function searchImages(
  query: string,
  page: number = 1,
  limit: number = 50,
): Promise<{ images: ImageDocument[]; total: number }> {
  const database = getDatabase();
  const imagesCollection = database.collection<ImageDocument>(COLLECTIONS.IMAGES);

  const filter = { $text: { $search: query } };
  const total = await imagesCollection.countDocuments(filter);
  const images = await imagesCollection
    .find(filter)
    .sort({ score: { $meta: "textScore" } })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { images, total };
}
