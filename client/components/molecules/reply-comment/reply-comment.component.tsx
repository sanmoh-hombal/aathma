import React, { useState } from "react";

import { AthButton } from "@client/components/atoms";
import { AthAddComment } from "@client/components/organisms";
import { UserService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IReplyCommentComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	parentComment?: ICommentUserUpvote;
	onComplete: Function;
}

const AthReplyComment: React.FC<IReplyCommentComponentProps> = ({
	parentComment,
	onComplete,
	...rest
}: IReplyCommentComponentProps): JSX.Element => {
	const [formOpen, setFormOpen] = useState<boolean>(false);

	return (
		<>
			<AthButton
				disabled={!UserService.getIdFromLocalStorage()}
				secondary
				small
				onClick={() => setFormOpen(!formOpen)}
				{...rest}
			>
				Reply
			</AthButton>
			{formOpen && (
				<AthAddComment
					className="pt-8 pb-4"
					parentComment={parentComment}
					onComplete={(comment: ICommentUserUpvote) => {
						setFormOpen(false);
						onComplete(comment);
					}}
				/>
			)}
		</>
	);
};

export default AthReplyComment;
