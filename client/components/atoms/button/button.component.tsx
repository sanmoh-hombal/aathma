import React from "react";

export interface IAthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	loading?: boolean;
	secondary?: boolean;
	small?: boolean;
}

const AthButton: React.FC<IAthButtonProps> = ({
	children,
	active,
	disabled,
	loading,
	secondary,
	small,
	...rest
}: IAthButtonProps): JSX.Element => {
	const classes: Array<string> = ["ath-button"];
	active && classes.push("active");
	secondary && classes.push("secondary");
	small && classes.push("small");

	return (
		<button {...rest} disabled={loading || disabled} className={`${classes.join(" ")} ${rest.className}`}>
			{loading ? "Loading ..." : children}
		</button>
	);
};

export default AthButton;
