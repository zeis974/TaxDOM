import { defineTokens } from "@pandacss/dev"

export const tokens = defineTokens({
	fonts: {
		nativeFont: {
			value:
				'--apple-system, system-ui, BlinkMacSystemFont,"Segoe UI",Roboto, "Helvetica Neue", Arial, sans-serif;',
		},
	},
	sizes: {
		navbarHeight: { value: "80px" },
	},
	colors: {
		bg: { value: "#121212" },
		secondaryBg: { value: "#2a2a2a" },
	},
})
