import { Router as expressRouter, Router } from "express";

import { CommentController } from "@server/controllers";

const router: Router = expressRouter();

router.get("/", CommentController.get);
router.post("/", CommentController.post);

export default router;
