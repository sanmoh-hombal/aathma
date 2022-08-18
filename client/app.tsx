import React, { useEffect, useState } from "react";

import AthAddComment from "@client/components/organisms/add-comment";
import AthListComment from "@client/components/organisms/list-comment";
import { SocketProvider } from "@client/providers";
import { CommentService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";

const App: React.FC = (): JSX.Element => {
	const [comments, setComments] = useState<Array<ICommentUserUpvote>>([]);

	const _refreshComments = async (): Promise<void> => {
		const comments: Array<ICommentUserUpvote> = await CommentService.get();
		setComments(comments);
	};

	useEffect(() => {
		_refreshComments();
	}, []);

	return (
		<SocketProvider.SocketContext.Provider value={SocketProvider.socket}>
			<div className="mx-auto my-40 px-8 py-4 sm:w-1/2">
				<div className="text-xl font-bold text-center sm:text-left">Discussion</div>
				<AthAddComment onComplete={_refreshComments} />
				<AthListComment comments={comments} />
			</div>
		</SocketProvider.SocketContext.Provider>
	);
};

export default App;
