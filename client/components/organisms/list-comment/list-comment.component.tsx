import React from "react";

import { AthComment } from "@client/components/organisms";
import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IListCommentProps {
	comments: Array<ICommentUserUpvote>;
	loading?: boolean;
}

const AthListComment: React.FC<IListCommentProps> = ({ comments, loading }: IListCommentProps): JSX.Element => {
	return (
		<div className="py-10">
			{loading ? (
				<div>Loading ...</div>
			) : (
				comments.map((comment: ICommentUserUpvote) => <AthComment comment={comment} key={comment.id} />)
			)}
		</div>
	);
};

export default AthListComment;
