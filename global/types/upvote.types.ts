import { comment as IComment, upvote as IUpvote, user as IUser } from "@prisma/client";

type IUpvoteCommentUser = IUpvote & { comment?: IComment; user?: IUser };

export type { IUpvote, IUpvoteCommentUser };
