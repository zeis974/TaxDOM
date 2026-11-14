import { definePreset } from "@pandacss/dev"

import { keyframes, semanticTokens, tokens, utilities } from "./theme"

const taxdomPreset = definePreset({
  name: "taxdom",
  theme: {
    extend: {
      tokens,
      semanticTokens,
      keyframes,
    },
  },
  utilities,
  conditions: {
    light: ".light &",
    dark: '.dark &, [data-theme="dark"] &',
    // Layout contract for the floating mobile tab bar: narrow viewports and every touch device
    touch: "@media (width < 768px), (hover: none) and (pointer: coarse)",
  },
})

// Options shared by every app; an app only adds `globalCss` (or overrides `hash`) if it differs
/** @type {import("@pandacss/dev").Config} */
export const baseConfig = {
  presets: [taxdomPreset],
  preflight: false,
  hash: true,
  minify: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  jsxStyleProps: "none",
  jsxFramework: "react",
}

export default taxdomPreset
