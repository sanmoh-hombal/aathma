import { UserService } from "@client/services";
import { AxiosUtil } from "@client/utils";

import { ICommentUserUpvote } from "@global/types/comment.type";

/**
 * It adds a comment to the database, and returns the comment with the user and upvotes
 * @param {string} content - string - The content of the comment
 * @return {ICommentUserUpvote} A promise that resolves to an ICommentUserUpvote
 */
export async function add(content: string): Promise<ICommentUserUpvote> {
	try {
		const userId: string | null = UserService.getIdFromLocalStorage();
		const comment: ICommentUserUpvote = (await AxiosUtil.post("comment", { content, userId })).data;
		comment.user?.id && UserService.setIdToLocalStorage(comment.user.id);
		return comment;
	} catch (e) {
		throw e;
	}
}

/**
 * It makes a GET request to the `/comment` endpoint and returns the response data
 * @return {Array<ICommentUserUpvote>} A promise that resolves to an array of ICommentUserUpvote objects
 */
export async function get(): Promise<Array<ICommentUserUpvote>> {
	try {
		return (await AxiosUtil.get("comment")).data;
	} catch (e) {
		throw e;
	}
}
