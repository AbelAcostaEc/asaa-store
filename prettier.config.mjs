/** @type {import("prettier").Config} */
const config = {
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tabWidth: 4,
	printWidth: 999,
	useTabs: true,
	overrides: [
		{
			files: "./src/**/*.astro",
			options: { parser: "astro" },
		},
	],
};

export default config;
