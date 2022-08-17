import { ICommentUserUpvote } from "@global/types/comment.type";
import React from "react";
import { AthAddCommentComponent } from "./components/organisms";

const handleComplete = (comment: ICommentUserUpvote) => console.log(comment);

const App: React.FC = (): JSX.Element => <AthAddCommentComponent onComplete={handleComplete} />;

export default App;
