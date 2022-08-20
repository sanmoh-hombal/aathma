import React, { useState } from "react";

import { AthReplyComment, AthUpvoteComment } from "@client/components/molecules";
import { DateUtil } from "@client/utils";

import { ICommentUserUpvote } from "@global/types/comment.type";
import AthCommentReplies from "../comment-replies";

export interface IAthCommentProps extends React.HTMLAttributes<HTMLDivElement> {
	comment: ICommentUserUpvote;
}

const AthComment: React.FC<IAthCommentProps> = ({ comment, ...rest }: IAthCommentProps): JSX.Element => {
	const [derivedComment, setderivedComment] = useState<ICommentUserUpvote>(comment);

	return (
		<div className={`flex ${derivedComment.parentId ? "pt-5" : "pb-10"} last:pb-0`} {...rest}>
			<div className="flex flex-col shrink-0 mr-4">
				<img src={derivedComment.user!.picture} />
				{derivedComment.children && derivedComment.children.length > 0 ? (
					<div className="flex flex-1 divide-x">
						<div className="w-1/2" />
						<div className="w-1/2" />
					</div>
				) : (
					""
				)}
			</div>
			<div className="grow">
				<div className="flex items-center">
					<div className="font-bold">
						{derivedComment.user!.firstName} {derivedComment.user!.lastName}
					</div>
					<div className="mx-2">&#8226;</div>
					<div className="text-secondary-500 text-sm">{DateUtil.humanize(String(derivedComment.created))}</div>
				</div>
				<div className="font-light mb-4">{derivedComment.content}</div>
				<div>
					<AthUpvoteComment
						commentId={derivedComment.id}
						ownerId={derivedComment.user!.id}
						upvotes={derivedComment.upvotes || []}
						className="mr-4"
					/>
					{!derivedComment.parentId && (
						<AthReplyComment onComplete={setderivedComment} parentId={derivedComment.id} className="ml-4" />
					)}
				</div>
				{(derivedComment.children || []).length > 0 && <AthCommentReplies comment={derivedComment} />}
			</div>
		</div>
	);
};

export default AthComment;
