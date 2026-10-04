import { defineConfig } from "@pandacss/dev"

import taxdomPreset from "@taxdom/ui/preset"

export default defineConfig({
  preflight: false,
  presets: [taxdomPreset],
  hash: {
    className: true,
    cssVar: false,
  },
  minify: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  jsxStyleProps: "none",
  jsxFramework: "react",
})
