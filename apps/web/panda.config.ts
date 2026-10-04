import { defineConfig } from "@pandacss/dev"

import taxdomPreset from "@taxdom/ui/preset"

export default defineConfig({
  eject: true,
  preflight: false,
  presets: [taxdomPreset],
  hash: true,
  minify: true,
  lightningcss: true,
  include: ["./src/app/**/*.{ts,tsx,js,jsx}", "./src/components/**/*.{ts,tsx,js,jsx}"],
  importMap: "@/panda",
  outdir: "styled-system",
  jsxStyleProps: "none",
  jsxFramework: "react",
  globalCss: {
    body: {
      backgroundColor: "{colors.background}",
    },
  },
})
