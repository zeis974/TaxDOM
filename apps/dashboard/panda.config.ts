import { defineConfig } from "@pandacss/dev"

import { baseConfig } from "@taxdom/ui/preset"

export default defineConfig({
  ...baseConfig,
  include: ["./src/**/*.{ts,tsx}"],
  globalCss: {
    body: {
      backgroundColor: "{colors.background}",
      color: "{colors.foreground}",
    },
  },
})
