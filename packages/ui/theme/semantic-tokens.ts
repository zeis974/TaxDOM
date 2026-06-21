import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    error: { value: { base: "#960000", _dark: "#ff9b9b" } },
    primary: { value: { base: "black", _dark: "white" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.1)" } },
    border: { value: { base: "#bdc3c7", _dark: "#525252" } },
    background: { value: { base: "white", _dark: "#121212" } },
    secondaryBackground: { value: { base: "#dde4e6", _dark: "#2b2b2b" } },
    tertiaryBackground: { value: { base: "#ecf0f1", _dark: "#3b3b3b" } },
    blue: { value: { base: "#3498db", _dark: "#3498db" } },

    // Statuts (badges actif/inactif, succès/danger)
    success: { value: { base: "#dcfce7", _dark: "#14321f" } },
    successFg: { value: { base: "#166534", _dark: "#86efac" } },
    danger: { value: { base: "#fee2e2", _dark: "#3a1414" } },
    dangerFg: { value: { base: "#991b1b", _dark: "#fca5a5" } },
    dangerHover: { value: { base: "#fecaca", _dark: "#4d1a1a" } },
    info: { value: { base: "#e0f2fe", _dark: "#0c2b3a" } },
    infoFg: { value: { base: "#0284c7", _dark: "#7dd3fc" } },
    warning: { value: { base: "#fef3c7", _dark: "#3a2f0c" } },
    warningFg: { value: { base: "#d97706", _dark: "#fcd34d" } },
    accent: { value: { base: "#f3e8ff", _dark: "#2b1840" } },
    accentFg: { value: { base: "#7c3aed", _dark: "#c4b5fd" } },

    // Bordures / textes secondaires partagés (anciennement codés en dur)
    mutedBorder: {
      value: { base: "rgba(148, 163, 184, 0.24)", _dark: "rgba(148, 163, 184, 0.18)" },
    },
    mutedText: { value: { base: "rgba(100, 116, 139, 0.95)", _dark: "rgba(148, 163, 184, 0.85)" } },
    overlay: { value: { base: "rgba(15, 23, 42, 0.45)", _dark: "rgba(0, 0, 0, 0.6)" } },
  },
})
