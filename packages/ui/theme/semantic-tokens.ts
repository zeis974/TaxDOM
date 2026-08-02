import { defineSemanticTokens } from "@pandacss/dev"

export const semanticTokens = defineSemanticTokens({
  colors: {
    // Neutrals
    foreground: { value: { base: "black", _dark: "white" } },
    background: { value: { base: "white", _dark: "#121212" } },
    elevated: { value: { base: "#f1f3f4", _dark: "#1e1e1e" } },
    // Dark enough to clear 3:1 against both `background` and `elevated`, so a
    // card or input outline stays an identifiable component boundary.
    border: { value: { base: "#838e96", _dark: "#6a6a6a" } },
    textMuted: { value: { base: "#617087", _dark: "#94a3b8" } },
    shadow: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(0, 0, 0, 0.5)" } },
    overlay: { value: { base: "rgba(15, 23, 42, 0.45)", _dark: "rgba(0, 0, 0, 0.6)" } },

    // Primary — single brand blue. Light values clear 4.5:1 against `elevated`,
    // not just `background`: primary carries link text, and links sit inside
    // cards. `elevated` is the stricter surface, so it sets the value.
    primary: { value: { base: "#1f74af", _dark: "#60a5fa" } },
    primaryHover: { value: { base: "#1a6092", _dark: "#3b82f6" } },

    // Status — always used as an `Fg` / `Bg` pair so text stays readable on its
    // own tint. Never mix an Fg from one status with the Bg of another.
    successFg: { value: { base: "#166534", _dark: "#4ade80" } },
    successBg: { value: { base: "#dcfce7", _dark: "#14321f" } },
    warningFg: { value: { base: "#b45309", _dark: "#fbbf24" } },
    warningBg: { value: { base: "#fef3c7", _dark: "#3a2f0c" } },
    errorFg: { value: { base: "#960000", _dark: "#ff9b9b" } },
    errorBg: { value: { base: "#fee2e2", _dark: "#3a1212" } },
    // Info is a real status, not a primary tint. A hand-rolled
    // `color-mix(primary 12%)` surface cannot carry readable text in both
    // modes: the token that passes on the light tint fails on the dark one.
    infoFg: { value: { base: "#1e40af", _dark: "#93c5fd" } },
    infoBg: { value: { base: "#dbeafe", _dark: "#172554" } },

    // Categorical accents — for things distinguished by hue rather than by
    // status: flow/diagram nodes, series in a chart. Readable on `background`
    // in both color modes, so they work as borders, icons and text.
    //
    // The set deliberately contains no blue: blue is the brand hue, and an
    // accent blue is indistinguishable from `primary` in dark mode. Greens are
    // emerald rather than pure green for the same reason against `successFg`.
    accentGreen: { value: { base: "#059669", _dark: "#34d399" } },
    accentCyan: { value: { base: "#0891b2", _dark: "#22d3ee" } },
    accentViolet: { value: { base: "#7c3aed", _dark: "#a78bfa" } },
    accentPink: { value: { base: "#db2777", _dark: "#f472b6" } },
    accentOrange: { value: { base: "#ea580c", _dark: "#fb923c" } },
  },
})
