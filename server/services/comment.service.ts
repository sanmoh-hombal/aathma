import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import { IComment, ICommentUserUpvote } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

import { UserService } from "@server/services";

/**
 * It returns an array of comment objects descending based on created
 * @return {Array<IComment>} An array of comments
 */
export async function get(): Promise<Array<IComment>> {
	try {
		return await PrismaClient.comment.findMany({ orderBy: { created: "desc" } });
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
 * @return {ICommentUserUpvote} A promise that resolves to a ICommentUser object with user and upvotes
 */
export async function add(content: string, userId?: string): Promise<ICommentUserUpvote> {
	try {
		let user: IUser | null = null;

		if (userId) user = await UserService.get(userId);
		if (!user || !userId) user = await UserService.add();

		const comment: ICommentUserUpvote = await PrismaClient.comment.create({
			data: { id: randomUUID(), userId: user.id, content },
			include: { user: true, upvotes: true },
		});

		return comment;
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}
