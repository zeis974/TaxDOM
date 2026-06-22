import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    // Base colors
    foreground: { value: { base: "black", _dark: "white" } },
    bg: { value: { base: "white", _dark: "#121212" } },
    surface: { value: { base: "#f1f3f4", _dark: "#1e1e1e" } },

    border: { value: { base: "#bdc3c7", _dark: "#6a6a6a" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.3)" } },
    overlay: { value: { base: "rgba(15, 23, 42, 0.45)", _dark: "rgba(0, 0, 0, 0.6)" } },

    textMuted: { value: { base: "#64748b", _dark: "#94a3b8" } },

    // Primary colors
    peterRiver: { value: { base: "#3498db", _dark: "#60a5fa" } },

    // Status colors
    success: { value: { base: "#dcfce7", _dark: "#14321f" } },
    warning: { value: { base: "#fef3c7", _dark: "#3a2f0c" } },
    error: { value: { base: "#960000", _dark: "#ff9b9b" } },
  },
})
