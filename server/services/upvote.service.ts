import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUpvote } from "@global/types/upvote.types";

/**
 * It takes a commentId and a userId, and if the user has already upvoted the comment, it removes the upvote,
 * otherwise it adds an upvote
 * @param {string} commentId - The id of the comment that the user is upvoting.
 * @param {string} userId - The user who is upvoting the comment
 * @return {ICommentUserUpvote} A comment with the upvote added.
 */
export async function toggle(commentId: string, userId: string): Promise<ICommentUserUpvote> {
	try {
		const upvotes: Array<IUpvote> = await PrismaClient.upvote.findMany({ where: { commentId, userId } });

		if (upvotes.length) {
			await PrismaClient.upvote.deleteMany({ where: { commentId, userId } });
		} else {
			await PrismaClient.upvote.create({ data: { id: randomUUID(), commentId, userId } });
		}

		return await PrismaClient.comment.findFirstOrThrow({
			where: { id: commentId },
			include: { upvotes: true, user: true },
		});
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}
