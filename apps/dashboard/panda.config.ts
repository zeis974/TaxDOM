import { defineConfig } from "@pandacss/dev"

import { keyframes, semanticTokens, tokens, utilities } from "./theme"

export default defineConfig({
  eject: true,
  preflight: false,
  presets: [],
  hash: true,
  minify: true,
  lightningcss: true,
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/routes/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  theme: {
    semanticTokens,
    tokens,
    keyframes,
  },
  utilities: {
    utilities,
  },
  globalCss: {
    body: {
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
