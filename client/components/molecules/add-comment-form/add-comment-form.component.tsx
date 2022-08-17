import React, { useState } from "react";

import AthButton from "@client/components/atoms/button";
import AthInput from "@client/components/atoms/input";

export interface IAthAddCommentFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	loading?: boolean;
}

const AthAddCommentForm: React.FC<IAthAddCommentFormProps> = ({
	children,
	loading,
	...rest
}: IAthAddCommentFormProps): JSX.Element => {
	const [comment, setComment] = useState<string>("");

	return (
		<form {...rest} className={`flex flex-1 ${rest.className}`}>
			<AthInput
				placeholder="What are your thoughts?"
				loading={loading}
				value={comment}
				onInput={(event) => setComment((event.target as HTMLInputElement).value)}
				className="flex-1"
			/>
			<AthButton loading={loading} disabled={!comment} type="submit" className="ml-4">
				Submit
			</AthButton>
		</form>
	);
};

export default AthAddCommentForm;
