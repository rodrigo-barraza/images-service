// ─── Library Routes ─────────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";
import * as LibraryService from "../services/LibraryService.ts";

const router = Router();

router.get("/", async (_req: Request, response: Response) => {
  const count = await LibraryService.getImageCount();
  response.json({ status: "ok", imageCount: count });
});

router.get("/browse", async (request: Request, response: Response) => {
  const page = parseInt(request.query.page as string) || 1;
  const limit = Math.min(parseInt(request.query.limit as string) || 50, 200);
  const sortField = (request.query.sort as string) || "dateIndexed";
  const sortDirection = request.query.order === "asc" ? 1 : -1;

  const result = await LibraryService.getImages(page, limit, sortField, sortDirection as 1 | -1);
  response.json({ ...result, page, limit });
});

router.get("/search", async (request: Request, response: Response) => {
  const query = request.query.q as string;
  if (!query) {
    response.status(400).json({ error: "Missing search query parameter 'q'" });
    return;
  }

  const page = parseInt(request.query.page as string) || 1;
  const limit = Math.min(parseInt(request.query.limit as string) || 50, 200);

  const result = await LibraryService.searchImages(query, page, limit);
  response.json({ ...result, page, limit });
});

export default router;
