import { PrismaClientValidationError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";

import Constants from "@global/constants";

import { CommentService } from "@server/services";

export async function get(request: Request, response: Response, _next: NextFunction): Promise<void> {
	try {
		response
			.status(200)
			.json(
				await CommentService.get(
					parseInt(request.query.page?.toString() || Constants.DEFAULT_PAGE.toString()),
					parseInt(request.query.pageSize?.toString() || Constants.PAGE_SIZE.toString()),
					request.body.parentId,
				),
			);
	} catch (e: Error | any) {
		response.status(500).send(e.message);
	}
}

export async function post(request: Request, response: Response, _next: NextFunction): Promise<void> {
	try {
		response
			.status(200)
			.json(await CommentService.add(request.body.content, request.body.userId || null, request.body.parentId || null));
	} catch (e: Error | PrismaClientValidationError | any) {
		if (e instanceof PrismaClientValidationError) response.status(500).send(e.message);
		else response.status(500).send(e.message);
	}
}
