const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./client/**/*.{html,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: colors.violet,
				secondary: colors.gray,
			},
		},
		fontSize: {
			xs: ["10px", "14px"],
			sm: ["12px", "18px"],
			base: ["14px", "22px"],
			lg: ["16px", "26px"],
			xl: ["18px", "30px"],
		},
	},
	plugins: [],
};
