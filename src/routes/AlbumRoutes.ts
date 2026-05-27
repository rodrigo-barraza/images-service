// ─── Album Routes ───────────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, response: Response) => {
  response.json({ albums: [], total: 0 });
});

router.post("/", async (_req: Request, response: Response) => {
  response.json({ message: "Create album — endpoint stub" });
});

router.get("/:albumId", async (request: Request, response: Response) => {
  const { albumId } = request.params;
  response.json({ message: `Album ${albumId} — endpoint stub` });
});

router.patch("/:albumId", async (request: Request, response: Response) => {
  const { albumId } = request.params;
  response.json({ message: `Updated album ${albumId} — endpoint stub` });
});

router.delete("/:albumId", async (request: Request, response: Response) => {
  const { albumId } = request.params;
  response.json({ message: `Deleted album ${albumId} — endpoint stub` });
});

export default router;
