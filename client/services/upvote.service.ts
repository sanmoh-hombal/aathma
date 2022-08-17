import { UserService } from "@client/services";
import { AxiosUtil } from "@client/utils";

import { ICommentUserUpvote } from "@global/types/comment.type";

/**
 * It takes a commentId and a userId, and returns a CommentUserUpvote object
 * @param {string} commentId - The id of the comment that the user is upvoting.
 * @return {ICommentUserUpvote} A promise that resolved to ICommentUserUpvote object
 */
export async function toggle(commentId: string): Promise<ICommentUserUpvote> {
	try {
		const userId: string = UserService.getIdFromLocalStorage()!;
		return (await AxiosUtil.put("/upvote", { commentId, userId })).data;
	} catch (e) {
		throw e;
	}
}
