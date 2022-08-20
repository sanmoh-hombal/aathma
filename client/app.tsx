import React, { useEffect, useState } from "react";

import { AthAddComment, AthListComment } from "@client/components/organisms";
import { SocketProvider } from "@client/providers";
import { CommentService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";

// TODO: Get total pages from the API later on
const MAX_PAGES: number = 3;

const App: React.FC = (): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [comments, setComments] = useState<Array<ICommentUserUpvote>>([]);

	const _refreshComments = async (): Promise<void> => {
		setLoading(true);
		const commentsResponse: Array<ICommentUserUpvote> = await CommentService.get(page);
		setComments([...comments, ...commentsResponse]);
		setPage(page + 1);
		setLoading(false);
	};

	useEffect(() => {
		page < MAX_PAGES && _refreshComments();
	}, [page]);

	return (
		<SocketProvider.SocketContext.Provider value={SocketProvider.socket}>
			<div className="mx-auto my-40 px-8 py-4 sm:w-1/2">
				<div className="text-xl font-bold text-center sm:text-left">Discussion</div>
				<AthAddComment onComplete={_refreshComments} className="py-10 border-b" />
				<AthListComment comments={comments} loading={loading} />
			</div>
		</SocketProvider.SocketContext.Provider>
	);
};

export default App;
