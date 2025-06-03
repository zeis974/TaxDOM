import { defineConfig } from "@pandacss/dev"

import { keyframes, semanticTokens, tokens, utilities } from "./theme"

export default defineConfig({
  eject: true,
  presets: [],
  hash: true,
  minify: true,
  lightningcss: true,
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/services/**/*.{ts,tsx,js,jsx}",
  ],
  importMap: "@/panda",
  theme: {
    extend: {
      semanticTokens,
      tokens,
      keyframes,
      breakpoints: {
        mobile: "768px",
      },
    },
  },
  utilities: {
    utilities,
  },
  globalCss: {
    body: {
      height: "100dvh",
      backgroundColor: "{colors.background}",
    },
  },
  conditions: {
    light: ".light &",
    dark: '.dark &, [data-theme="dark"] &',
  },
  outdir: "styled-system",
  syntax: "template-literal",
  jsxFramework: "react",
})
