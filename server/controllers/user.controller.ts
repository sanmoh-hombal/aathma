import { NextFunction, Request, Response } from "express";

import { NotFoundError } from "@prisma/client/runtime";

import { UserService } from "@server/services";

export async function get(request: Request, response: Response, _next: NextFunction): Promise<void> {
	try {
		response.json(await UserService.get(String(request.query.id)));
	} catch (e: Error | any) {
		if (e instanceof NotFoundError) response.status(404).send(e.message);
		else response.status(500).send(e.message);
	}
}
