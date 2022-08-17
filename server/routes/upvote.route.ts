import { Router as expressRouter, Router } from "express";

import { UpvoteController } from "@server/controllers";

const router: Router = expressRouter();

router.put("/", UpvoteController.put);

export default router;
