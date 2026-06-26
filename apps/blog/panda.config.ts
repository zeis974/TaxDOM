import { defineConfig } from "@pandacss/dev"

import taxdomPreset from "@taxdom/ui/preset"

export default defineConfig({
  eject: true,
  preflight: false,
  presets: [taxdomPreset],
  hash: {
    className: true,
    cssVar: false,
  },
  minify: true,
  lightningcss: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  syntax: "template-literal",
  jsxFramework: "react",
})
