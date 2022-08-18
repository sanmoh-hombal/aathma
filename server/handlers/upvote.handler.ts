import { Server as SocketIoServer, Socket } from "socket.io";

import { ICommentUserUpvote } from "@global/types/comment.type";

import { UpvoteService } from "@server/services";

const upvoteHandler = (io: SocketIoServer, socket: Socket) => {
	socket.on("upvote:toggle", async (commentId: string, userId: string) => {
		const comment: ICommentUserUpvote = await UpvoteService.toggle(commentId, userId);
		io.emit("upvote:refresh", comment);
	});
};

export default upvoteHandler;
