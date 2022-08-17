import React, { useState } from "react";

import { AthButtonComponent } from "@client/components/atoms";
import { UpvoteService, UserService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUpvote } from "@global/types/upvote.types";

export interface IAthUpvoteCommentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	commentId: string;
	ownerId: string;
	upvotes: Array<IUpvote>;
}

const AthUpvoteComment: React.FC<IAthUpvoteCommentProps> = ({
	commentId,
	ownerId,
	upvotes,
	...rest
}: IAthUpvoteCommentProps): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(false);
	const [derivedUpvotes, setDerivedUpvotes] = useState<Array<IUpvote>>(upvotes);

	const handleClick = async (): Promise<void> => {
		try {
			setLoading(true);
			const updatedComment: ICommentUserUpvote = await UpvoteService.toggle(commentId);
			setDerivedUpvotes(updatedComment.upvotes || []);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AthButtonComponent
			loading={loading}
			active={
				derivedUpvotes.filter((upvote: IUpvote) => upvote.userId === UserService.getIdFromLocalStorage()).length > 0
			}
			secondary
			small
			onClick={handleClick}
			{...rest}
		>
			<span>&#9650;</span>
			<span className="px-2">Upvote</span>
			{derivedUpvotes.length > 0 ? <span className="text-xs border-l pl-2">{derivedUpvotes.length}</span> : ""}
		</AthButtonComponent>
	);
};

export default AthUpvoteComment;
