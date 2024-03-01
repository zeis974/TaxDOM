import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
	colors: {
		primary: { value: { base: "white", _dark: "dark" } },
		secondaryBackground: { value: { base: "#2a2a2a", _dark: "#2a2a2a" } },
	},
})
