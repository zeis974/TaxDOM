import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    primary: { value: { base: "black", _dark: "white" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.1)" } },
    lightGray: { value: { base: "red", _dark: "#3b3b3b" } },
    secondaryBackground: { value: { base: "#2a2a2a", _dark: "#2a2a2a" } },
  },
})
