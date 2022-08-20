import { UserService } from "@client/services";
import { AxiosUtil } from "@client/utils";

import Constants from "@global/constants";
import { ICommentUserUpvote, ICommentUserUpvoteResponse } from "@global/types/comment.type";

/**
 * It adds a comment to the database, and returns the comment with the user and upvote information
 * @param {string} content - string - The content of the comment
 * @param {string} [parentId] - The id of the comment that this comment is a reply to.
 * @return {ICommentUserUpvote} A promise that resolves to an ICommentUserUpvote
 */
export async function add(content: string, parentId?: string): Promise<ICommentUserUpvote> {
	try {
		const userId: string | null = UserService.getIdFromLocalStorage();
		const comment: ICommentUserUpvote = (await AxiosUtil.post("comment", { content, userId, parentId })).data;
		comment.user?.id && UserService.setIdToLocalStorage(comment.user.id);
		return comment;
	} catch (e) {
		throw e;
	}
}

/**
 * It gets a list of comments
 * @param {number} page - The page number to get.
 * @param {number} pageSize - The number of comments to return per page.
 * @param {string} [parentId] - The id of the comment that you want to get the replies for.
 * @return {ICommentUserUpvoteResponse} An array of ICommentUserUpvote
 */
export async function get(
	page: number = Constants.DEFAULT_PAGE,
	pageSize: number = Constants.PAGE_SIZE,
	parentId?: string,
): Promise<ICommentUserUpvoteResponse> {
	try {
		return (await AxiosUtil.get("comment", { params: { page, pageSize, parentId } })).data;
	} catch (e) {
		throw e;
	}
}
