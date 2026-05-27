// ─── Thumbnail Routes ───────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Thumbnail for ${imageId} — endpoint stub` });
});

export default router;
