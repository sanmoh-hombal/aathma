import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

import { UserService } from "@server/services";

/**
 * It returns an array of comments, including their children, and the user and upvotes for each comment
 * @param {string} [parentId] - The id of the parent comment. If this is null, it will return the top level comments.
 * @return {Array<ICommentUserUpvote>} An array of comments
 */
export async function get(parentId?: string): Promise<Array<ICommentUserUpvote>> {
	try {
		return await PrismaClient.comment.findMany({
			where: { parentId: parentId || null },
			orderBy: { created: "desc" },
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
