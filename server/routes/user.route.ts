import { Router as expressRouter, Router } from "express";

import { UserController } from "@server/controllers";

const router: Router = expressRouter();

router.get("/", UserController.get);

export default router;
