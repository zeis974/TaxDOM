import { defineConfig } from "@pandacss/dev"

import taxdomPreset from "@taxdom/ui/preset"

export default defineConfig({
  preflight: false,
  presets: [taxdomPreset],
  hash: true,
  minify: true,
  include: ["./src/**/*.{ts,tsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  jsxStyleProps: "none",
  jsxFramework: "react",
  globalCss: {
    body: {
      backgroundColor: "{colors.background}",
      color: "{colors.foreground}",
    },
  },
})
