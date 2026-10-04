import { defineConfig } from "@pandacss/dev"

import { baseConfig } from "@taxdom/ui/preset"

export default defineConfig({
  ...baseConfig,
  include: ["./src/app/**/*.{ts,tsx,js,jsx}", "./src/components/**/*.{ts,tsx,js,jsx}"],
  globalCss: {
    body: {
      backgroundColor: "{colors.background}",
    },
  },
})
