import { IUser } from "@global/types/user.type";
import { comment as IComment } from "@prisma/client";

type ICommentUser = IComment & { user: IUser };

export type { IComment, ICommentUser };
