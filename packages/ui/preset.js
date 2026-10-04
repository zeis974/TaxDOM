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
  },
})

// Options shared by every app; each app only adds `include` (+ `globalCss`, `hash` if it differs)
/** @type {import("@pandacss/dev").Config} */
export const baseConfig = {
  presets: [taxdomPreset],
  preflight: false,
  hash: true,
  minify: true,
  importMap: "@/panda",
  outdir: "styled-system",
  jsxStyleProps: "none",
  jsxFramework: "react",
}

export default taxdomPreset
