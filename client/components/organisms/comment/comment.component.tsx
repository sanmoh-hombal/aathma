import React from "react";

import { AthReplyComment, AthUpvoteComment } from "@client/components/molecules";
import { DateUtil } from "@client/utils";

import { ICommentUserUpvote } from "@global/types/comment.type";
import AthCommentReplies from "../comment-replies";

export interface IAthCommentProps extends React.HTMLAttributes<HTMLDivElement> {
	comment: ICommentUserUpvote;
}

const AthComment: React.FC<IAthCommentProps> = ({ comment, ...rest }: IAthCommentProps): JSX.Element => {
	return (
		<div className={`flex ${comment.parentId ? "pt-5" : "pb-10"} last:pb-0`} {...rest}>
			<div className="flex flex-col shrink-0 mr-4">
				<img src={comment.user!.picture} />
				{comment.children && comment.children.length > 0 ? (
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
						{comment.user!.firstName} {comment.user!.lastName}
					</div>
					<div className="mx-2">&#8226;</div>
					<div className="text-secondary-500 text-sm">{DateUtil.humanize(String(comment.created))}</div>
				</div>
				<div className="font-light mb-4">{comment.content}</div>
				<div>
					<AthUpvoteComment
						commentId={comment.id}
						ownerId={comment.user!.id}
						upvotes={comment.upvotes || []}
						className="mr-4"
					/>
					{!comment.parentId && (
						<AthReplyComment onComplete={() => console.log("complete")} parentId={comment.id} className="ml-4" />
					)}
				</div>
				{(comment.children || []).length > 0 && <AthCommentReplies comment={comment} />}
			</div>
		</div>
	);
};

export default AthComment;
