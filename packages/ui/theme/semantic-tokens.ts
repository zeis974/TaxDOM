import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    // Neutrals
    foreground: { value: { base: "black", _dark: "white" } },
    background: { value: { base: "white", _dark: "#121212" } },
    elevated: { value: { base: "#f1f3f4", _dark: "#1e1e1e" } },
    border: { value: { base: "#bdc3c7", _dark: "#6a6a6a" } },
    textMuted: { value: { base: "#64748b", _dark: "#94a3b8" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.5)" } },
    overlay: { value: { base: "rgba(15, 23, 42, 0.45)", _dark: "rgba(0, 0, 0, 0.6)" } },

    // Primary — single brand blue.
    primary: { value: { base: "#3498db", _dark: "#60a5fa" } },
    primaryHover: { value: { base: "#2980b9", _dark: "#3b82f6" } },

    // Status — each is a foreground (text/icon/border) + a subtle background.
    successFg: { value: { base: "#166534", _dark: "#4ade80" } },
    successBg: { value: { base: "#dcfce7", _dark: "#14321f" } },
    warningFg: { value: { base: "#d97706", _dark: "#fbbf24" } },
    warningBg: { value: { base: "#fef3c7", _dark: "#3a2f0c" } },
    errorFg: { value: { base: "#960000", _dark: "#ff9b9b" } },
    errorBg: { value: { base: "#fee2e2", _dark: "#3a1212" } },
  },
})
