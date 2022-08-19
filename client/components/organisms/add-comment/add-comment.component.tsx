import React, { BaseSyntheticEvent, useEffect, useState } from "react";

import AthAddCommentForm from "@client/components/molecules/add-comment-form/add-comment-form.component";
import { CommentService, UserService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

export interface IAthAddCommentProps extends React.HTMLAttributes<HTMLDivElement> {
	onComplete?: Function;
	parentComment?: ICommentUserUpvote;
}

const AthAddComment: React.FC<IAthAddCommentProps> = ({
	onComplete,
	parentComment,
	...rest
}: IAthAddCommentProps): JSX.Element => {
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const _fetchUser = async () => {
		try {
			setLoading(true);
			const user: IUser | null = await UserService.get();
			setUser(user);
		} finally {
			setLoading(false);
		}
	};

	const _handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			setLoading(true);
			e.preventDefault();
			const comment: ICommentUserUpvote = await CommentService.add(e.target[0].value, parentComment?.id);
			!user && (await _fetchUser());
			onComplete && onComplete(comment);
			e.target.reset();
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		_fetchUser();
	}, []);

	return (
		<div className={`flex items-center ${rest.className ? rest.className : ""}`}>
			{user && <img src={user.picture} className="mr-4" />}
			<AthAddCommentForm loading={loading} onSubmit={_handleSubmit} />
		</div>
	);
};

export default AthAddComment;
