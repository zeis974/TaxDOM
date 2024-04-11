import { defineConfig } from "@pandacss/dev"

import { semanticTokens, tokens } from "./theme"

export default defineConfig({
	preflight: false,
	hash: true,
	minify: true,
	include: [
		"./src/components/**/*.{ts,tsx,js,jsx}",
		"./src/app/**/*.{ts,tsx,js,jsx}",
		"./src/services/**/*.{ts,tsx,js,jsx}",
	],
	importMap: "@/panda",
	theme: {
		semanticTokens,
		tokens,
	},
	globalCss: {
		body: {
			height: "100dvh",
		},
	},
	conditions: {
		light: ".light &",
		dark: '.dark &, [data-theme="dark"] &',
	},
	outdir: "styled-system",
	syntax: "template-literal",
	jsxFramework: "react",
})
