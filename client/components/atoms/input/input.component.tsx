import React from "react";

export interface IAthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	small?: boolean;
}

const AthInput: React.FC<IAthInputProps> = ({ small, ...rest }): JSX.Element => {
	const classes: Array<string> = ["ath-input"];
	small && classes.push("small");

	return <input {...rest} />;
};

export default AthInput;
