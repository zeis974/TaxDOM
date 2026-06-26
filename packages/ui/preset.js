import { definePreset } from "@pandacss/dev"

import { keyframes, semanticTokens, tokens, utilities } from "./theme"

export default definePreset({
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
