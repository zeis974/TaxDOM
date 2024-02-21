import { defineConfig } from "@pandacss/dev"

import { semanticTokens } from "./theme/semantic-tokens"

export default defineConfig({
	preflight: false,
	hash: true,
	minify: true,
	include: ["./src/components/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],
	exclude: [],
	theme: {
		semanticTokens,
		tokens: {
			fonts: {
				nativeFont: {
					value:
						'--apple-system, system-ui, BlinkMacSystemFont,"Segoe UI",Roboto, "Helvetica Neue", Arial, sans-serif;',
				},
			},
		},
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
