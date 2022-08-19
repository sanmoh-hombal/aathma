import React, { useState } from "react";

import AthReplyCommentComponent from "@client/components/molecules/reply-comment";
import AthUpvoteCommentComponent from "@client/components/molecules/upvote-comment";
import { DateUtil } from "@client/utils";

import { AthButtonComponent } from "@client/components/atoms";
import { ICommentUserUpvote } from "@global/types/comment.type";

export interface IAthCommentProps extends React.HTMLAttributes<HTMLDivElement> {
	comment: ICommentUserUpvote;
}

const AthComment: React.FC<IAthCommentProps> = ({ comment, ...rest }: IAthCommentProps): JSX.Element => {
	const [derivedComment, setDerivedComment] = useState<ICommentUserUpvote>(comment);
	const [showAllChildren, setShowAllChildren] = useState<boolean>(false);

	return (
		<div className={`flex ${comment.parentId ? "" : "pb-10"} last:pb-0`} {...rest}>
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
				<div className="mb-4">
					<AthUpvoteCommentComponent
						commentId={derivedComment.id}
						ownerId={derivedComment.user!.id}
						upvotes={derivedComment.upvotes || []}
						className="mr-4"
					/>
					{!derivedComment.parentId && (
						<AthReplyCommentComponent onComplete={setDerivedComment} parentComment={derivedComment} className="ml-4" />
					)}
				</div>
				{(showAllChildren ? derivedComment.children || [] : (derivedComment.children || []).slice(0, 2)).map(
					(child: ICommentUserUpvote) => (
						<AthComment key={child.id} comment={child} />
					),
				)}
				{!derivedComment.parentId && (derivedComment.children || []).length >= 2 && (
					<AthButtonComponent secondary small onClick={() => setShowAllChildren(!showAllChildren)}>
						{showAllChildren ? "Hide Replies" : `Show All Replies (${(derivedComment.children || []).length - 2}+)`}
					</AthButtonComponent>
				)}
			</div>
		</div>
	);
};

export default AthComment;
