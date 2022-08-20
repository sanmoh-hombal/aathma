import React, { BaseSyntheticEvent, useState } from "react";

import { AthButtonComponent, AthInputComponent } from "@client/components/atoms";

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
		<form {...rest} onReset={() => setComment("")} className={`flex flex-1 ${rest.className}`}>
			<AthInputComponent
				placeholder="What are your thoughts?"
				loading={loading}
				value={comment}
				onInput={(event: BaseSyntheticEvent) => setComment((event.target as HTMLInputElement).value)}
				className="flex-1"
			/>
			<AthButtonComponent loading={loading} disabled={!comment} type="submit" className="ml-4">
				Submit
			</AthButtonComponent>
		</form>
	);
};

export default AthAddCommentForm;
