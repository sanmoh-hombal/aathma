import { NextFunction, Request, Response } from "express";

import { UpvoteService } from "@server/services";

export async function put(request: Request, response: Response, _next: NextFunction): Promise<void> {
	try {
		response.status(200).json(await UpvoteService.toggle(request.body.commentId, request.body.userId));
	} catch (e: Error | any) {
		response.status(500).send(e.message);
	}
}
