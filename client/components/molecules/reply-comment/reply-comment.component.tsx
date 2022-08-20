import React, { useState } from "react";

import { AthButtonComponent } from "@client/components/atoms";
import { AthAddCommentComponent } from "@client/components/organisms";
import { UserService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IReplyCommentComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	parentComment?: ICommentUserUpvote;
	onComplete: Function;
}

const AthReplyCommentComponent: React.FC<IReplyCommentComponentProps> = ({
	parentComment,
	onComplete,
	...rest
}: IReplyCommentComponentProps): JSX.Element => {
	const [formOpen, setFormOpen] = useState<boolean>(false);

	return (
		<>
			<AthButtonComponent
				disabled={!UserService.getIdFromLocalStorage()}
				secondary
				small
				onClick={() => setFormOpen(!formOpen)}
				{...rest}
			>
				Reply
			</AthButtonComponent>
			{formOpen && (
				<AthAddCommentComponent
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

export default AthReplyCommentComponent;
