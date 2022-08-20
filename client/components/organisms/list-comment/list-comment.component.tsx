import React from "react";

import { AthCommentComponent } from "@client/components/organisms";
import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IListCommentProps {
	comments: Array<ICommentUserUpvote>;
}

const AthListComment: React.FC<IListCommentProps> = ({ comments }: IListCommentProps): JSX.Element => {
	return (
		<div className="py-10">
			{comments.map((comment: ICommentUserUpvote) => (
				<AthCommentComponent comment={comment} key={comment.id} />
			))}
		</div>
	);
};

export default AthListComment;
