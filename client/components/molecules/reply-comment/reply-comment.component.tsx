import React, { useState } from "react";

import AthButton from "@client/components/atoms/button/button.component";
import AthAddComment from "@client/components/organisms/add-comment/add-comment.component";

import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IReplyCommentComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	parentComment?: ICommentUserUpvote;
}

const AthReplyCommentComponent: React.FC<IReplyCommentComponentProps> = ({
	parentComment,
	...rest
}: IReplyCommentComponentProps): JSX.Element => {
	const [formOpen, setFormOpen] = useState<boolean>(false);

	return (
		<>
			<AthButton secondary small onClick={() => setFormOpen(!formOpen)} {...rest}>
				Reply
			</AthButton>
			{formOpen && (
				<AthAddComment className="pt-8 pb-4" parentComment={parentComment} onComplete={() => setFormOpen(false)} />
			)}
		</>
	);
};

export default AthReplyCommentComponent;
