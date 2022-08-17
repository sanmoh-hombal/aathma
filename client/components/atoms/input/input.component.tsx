import React from "react";

export interface IAthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	loading?: boolean;
	small?: boolean;
}

const AthInput: React.FC<IAthInputProps> = ({ disabled, loading, small, ...rest }): JSX.Element => {
	const classes: Array<string> = ["ath-input"];
	small && classes.push("small");

	return <input disabled={loading || disabled} {...rest} className={classes.join(" ")} />;
};

export default AthInput;
