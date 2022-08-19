import React from "react";

import AthComment from "@client/components/molecules/comment/comment.component";
import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IListCommentProps {
	comments: Array<ICommentUserUpvote>;
}

const AthListComment: React.FC<IListCommentProps> = ({ comments }: IListCommentProps): JSX.Element => {
	return (
		<div className="flex flex-col items-start py-10">
			{comments.map((comment: ICommentUserUpvote) => (
				<AthComment comment={comment} key={comment.id} />
			))}
		</div>
	);
};

export default AthListComment;
