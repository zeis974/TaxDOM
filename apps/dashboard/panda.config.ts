import { defineConfig } from "@pandacss/dev"

import taxdomPreset from "@taxdom/ui/preset"

export default defineConfig({
  eject: true,
  preflight: false,
  presets: [taxdomPreset],
  hash: true,
  minify: true,
  lightningcss: true,
  include: ["./src/**/*.{ts,tsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  syntax: "template-literal",
  jsxFramework: "react",
  globalCss: {
    body: {
      backgroundColor: "{colors.background}",
      color: "{colors.foreground}",
    },
  },
})
