import { IUpvote } from "@global/types/upvote.types";
import { IUser } from "@global/types/user.type";
import { comment as IComment } from "@prisma/client";

type ICommentUserUpvote = IComment & { user?: IUser; upvotes?: Array<IUpvote>; children: Array<ICommentUserUpvote> };

export type { IComment, ICommentUserUpvote };
