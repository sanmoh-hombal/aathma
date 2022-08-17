import React from "react";

import AthUpvoteCommentComponent from "@client/components/molecules/upvote-comment";
import { DateUtil } from "@client/utils";

import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IAthCommentProps extends React.HTMLAttributes<HTMLDivElement> {
	comment: ICommentUserUpvote;
}

const AthComment: React.FC<IAthCommentProps> = ({ comment, ...rest }: IAthCommentProps): JSX.Element => {
	return (
		<div className="flex items-start pb-10 last:pb-0" {...rest}>
			<img src={comment.user!.picture} className="rounded-full w-9 mr-4" />
			<div className="flex-0">
				<div className="flex items-center">
					<div className="font-bold">
						{comment.user!.firstName} {comment.user!.lastName}
					</div>
					<div className="mx-2">&#8226;</div>
					<div className="text-secondary-500 text-sm">{DateUtil.humanize(String(comment.created))}</div>
				</div>
				<div className="font-light mb-4">{comment.content}</div>
				<div className="flex">
					<AthUpvoteCommentComponent
						commentId={comment.id}
						ownerId={comment.user!.id}
						upvotes={comment.upvotes || []}
					/>
				</div>
			</div>
		</div>
	);
};

export default AthComment;
