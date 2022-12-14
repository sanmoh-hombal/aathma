import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import Constants from "@global/constants";
import { ICommentUserUpvote, ICommentUserUpvoteResponse } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

import { UserService } from "@server/services";

/**
 * It returns a list of comments, including their children, user, and upvotes
 * @param {number} page - The page number to return.
 * @param {number} pageSize - number = PAGE_SIZE,
 * @param {string} [parentId] - The id of the parent comment. If this is not provided, it will return
 * the top-level comments.
 * @return {ICommentUserUpvoteResponse} An array of comments with their user and upvotes.
 */
export async function get(
	page: number = Constants.DEFAULT_PAGE,
	pageSize: number = Constants.PAGE_SIZE,
	parentId?: string,
): Promise<ICommentUserUpvoteResponse> {
	try {
		const where: Record<string, any> = { parentId: parentId || null };
		const [count, comments] = await PrismaClient.$transaction([
			PrismaClient.comment.count({ where }),
			PrismaClient.comment.findMany({
				where,
				orderBy: { created: "desc" },
				include: {
					user: true,
					upvotes: true,
					_count: true,
					children: {
						orderBy: { created: "desc" },
						include: { user: true, upvotes: true },
						take: Constants.REPLIES_PAGE_SIZE,
					},
				},
				take: pageSize,
				skip: (page - 1) * pageSize,
			}),
		]);
		return { comments, page, pageSize, total: count };
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
				user: true,
				upvotes: true,
				parent: {
					include: {
						user: true,
						upvotes: true,
						_count: true,
						children: {
							orderBy: { created: "desc" },
							include: { user: true, upvotes: true },
							take: Constants.REPLIES_PAGE_SIZE,
						},
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
