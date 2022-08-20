import React, { useEffect, useRef, useState } from "react";

import { AthAddComment, AthComment } from "@client/components/organisms";
import { SocketProvider } from "@client/providers";
import { CommentService } from "@client/services";

import Constants from "@global/constants";
import { ICommentUserUpvote, ICommentUserUpvoteResponse } from "@global/types/comment.type";

const MAX_PAGES: number = 1000;

const App: React.FC = (): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(MAX_PAGES);
	const [comments, setComments] = useState<Array<ICommentUserUpvote>>([]);
	const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

	const observer = useRef(
		new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
			const first: IntersectionObserverEntry = entries[0];
			first.isIntersecting && setPage((no: number) => no + 1);
		}),
	);

	const _refreshComments = async (): Promise<void> => {
		setLoading(true);
		const commentsResponse: ICommentUserUpvoteResponse = await CommentService.get(page);
		setComments([...new Set([...comments, ...commentsResponse.comments])]);
		setPage(page + 1);
		setTotal(commentsResponse.total);
		setLoading(false);
	};

	useEffect(() => {
		page < total / Constants.PAGE_SIZE && _refreshComments();
	}, [page]);

	useEffect(() => {
		const currentElement: HTMLDivElement | null = lastElement;
		const currentObserver: IntersectionObserver = observer.current;

		currentElement && currentObserver.observe(currentElement);

		return () => {
			currentElement && currentObserver.unobserve(currentElement);
		};
	}, [lastElement]);

	return (
		<SocketProvider.SocketContext.Provider value={SocketProvider.socket}>
			<div className="mx-auto my-40 px-8 py-4 sm:w-1/2">
				<div className="text-xl font-bold text-center sm:text-left">Discussion</div>
				<AthAddComment onComplete={_refreshComments} className="py-10 border-b" />
				<div className="py-10">
					{comments.length > 0 &&
						comments.map((comment: ICommentUserUpvote, index: number) => {
							return index === comments.length - 1 && !loading && page <= total / Constants.PAGE_SIZE ? (
								<div ref={setLastElement} key={comment.id}>
									<AthComment comment={comment} key={comment.id} />
								</div>
							) : (
								<AthComment comment={comment} key={comment.id} />
							);
						})}
				</div>
				{loading && <div>Loading</div>}
			</div>
		</SocketProvider.SocketContext.Provider>
	);
};

export default App;
