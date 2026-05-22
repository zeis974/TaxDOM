import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    error: { value: { base: "#960000", _dark: "#ff9b9b" } },
    primary: { value: { base: "black", _dark: "white" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.1)" } },
    darkGray: { value: { base: "#bdc3c7", _dark: "#525252" } },
    background: { value: { base: "white", _dark: "#121212" } },
    secondaryBackground: { value: { base: "#dde4e6", _dark: "#2b2b2b" } },
    tertiaryBackground: { value: { base: "#ecf0f1", _dark: "#3b3b3b" } },
    blue: { value: { base: "#3498db", _dark: "#3498db" } },
  },
})
