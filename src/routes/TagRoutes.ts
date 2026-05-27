// ─── Tag Routes ─────────────────────────────────────────────

import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, response: Response) => {
  response.json({ tags: [], total: 0 });
});

router.post("/", async (_req: Request, response: Response) => {
  response.json({ message: "Create tag — endpoint stub" });
});

router.delete("/:tagId", async (request: Request, response: Response) => {
  const { tagId } = request.params;
  response.json({ message: `Deleted tag ${tagId} — endpoint stub` });
});

export default router;
