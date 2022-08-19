import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

import { UserService } from "@server/services";

export const DEFAULT_PAGE: number = 1;
export const PAGE_SIZE: number = 10;

/**
 * It returns a list of comments, ordered by creation date, with a maximum of `pageSize` comments per
 * page, starting from the `page`th page
 * @param {number} page - The page number of the comments to return.
 * @param {number} pageSize - number = PAGE_SIZE (10),
 * @param {string} [parentId] - The id of the parent comment. If this is not provided, it will return
 * the top-level comments.
 * @return {Array<ICommentUserUpvote>} An array of comments
 */
export async function get(
	page: number = DEFAULT_PAGE,
	pageSize: number = PAGE_SIZE,
	parentId?: string,
): Promise<Array<ICommentUserUpvote>> {
	try {
		return await PrismaClient.comment.findMany({
			where: { parentId: parentId || null },
			orderBy: { created: "desc" },
			take: pageSize,
			skip: (page - 1) * pageSize,
			include: {
				user: true,
				upvotes: true,
				children: { include: { user: true, upvotes: true }, orderBy: { created: "desc" } },
			},
		});
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}

/**
 * It adds a comment to the database, and if the userId is not provided, it creates a new user
 * @param {string} content - string - The content of the comment
 * @param {string} [userId] - The id of the user who created the comment. If not provided, a new user will be created.
 * @param {string} [parentId] - The id of the parent comment so that nesting can be possible.
 * @return {ICommentUserUpvote} A promise that resolves to a ICommentUser object with user and upvotes
 */
export async function add(content: string, userId?: string, parentId?: string): Promise<ICommentUserUpvote> {
	try {
		let user: IUser | null = null;

		if (userId) user = await UserService.get(userId);
		if (!user || !userId) user = await UserService.add();

		const comment: ICommentUserUpvote = await PrismaClient.comment.create({
			data: { id: randomUUID(), userId: user.id, parentId, content },
			include: {
				parent: {
					include: {
						user: true,
						upvotes: true,
						children: { include: { user: true, upvotes: true }, orderBy: { created: "desc" } },
					},
				},
			},
		});

		return parentId ? comment.parent! : comment;
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}
