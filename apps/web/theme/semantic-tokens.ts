import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
	sizes: {
		navbarHeight: { value: "80px", description: "Default height of navbar" },
	},
	colors: {
		bg: { value: "#121212" },
		primary: { value: { base: "white", _dark: "dark" } },
		secondaryBackground: { value: { base: "#2a2a2a", _dark: "#2a2a2a" } },
	},
})
