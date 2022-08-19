import { IUpvote } from "@global/types/upvote.types";
import { IUser } from "@global/types/user.type";
import { comment as IComment } from "@prisma/client";

type ICommentUserUpvote = IComment & {
	user?: IUser;
	upvotes?: Array<IUpvote>;
	children?: Array<IComment & { user?: IUser; upvotes?: Array<IUpvote> }>;
	parent?: (IComment & { user?: IUser; upvotes?: Array<IUpvote> }) | null;
};

export type { IComment, ICommentUserUpvote };
