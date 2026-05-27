// ─── Metadata Routes ────────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Metadata for ${imageId} — endpoint stub` });
});

router.patch("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Updated metadata for ${imageId} — endpoint stub` });
});

export default router;
