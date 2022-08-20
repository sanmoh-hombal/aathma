import React, { useState } from "react";

import { AthButton } from "@client/components/atoms";
import { AthComment } from "@client/components/organisms";
import { CommentService } from "@client/services";

import Constants from "@global/constants";
import { ICommentUserUpvote, ICommentUserUpvoteResponse } from "@global/types/comment.type";

export interface IAthCommentRepliesProps extends React.HTMLAttributes<HTMLDivElement> {
	comment: ICommentUserUpvote;
}

const AthCommentReplies: React.FC<IAthCommentRepliesProps> = ({ comment }: IAthCommentRepliesProps): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(2);
	const [replies, setReplies] = useState<Array<ICommentUserUpvote>>(comment.children || []);

	const _fetchReplies = async () => {
		setLoading(true);
		const nextReplies: ICommentUserUpvoteResponse = await CommentService.get(
			page,
			Constants.REPLIES_PAGE_SIZE,
			comment.id,
		);
		setReplies([...new Set([...replies, ...nextReplies.comments])]);
		setPage(page + 1);
		setLoading(false);
	};

	return (
		<>
			{replies.map((reply: ICommentUserUpvote) => (
				<AthComment comment={reply} key={reply.id} />
			))}
			{comment._count && comment._count.children > 2 && comment._count.children !== replies.length && (
				<AthButton loading={loading} secondary small className="mt-5" onClick={_fetchReplies}>
					Show {comment._count.children - replies.length} More Repl
					{comment._count.children - replies.length > 1 ? "ies" : "y"}
				</AthButton>
			)}
		</>
	);
};

export default AthCommentReplies;
