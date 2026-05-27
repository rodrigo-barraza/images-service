// ─── Image Routes ───────────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Image ${imageId} — endpoint stub` });
});

router.patch("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Updated image ${imageId} — endpoint stub` });
});

router.delete("/:imageId", async (request: Request, response: Response) => {
  const { imageId } = request.params;
  response.json({ message: `Deleted image ${imageId} — endpoint stub` });
});

export default router;
