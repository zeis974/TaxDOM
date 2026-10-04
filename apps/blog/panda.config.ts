import { defineConfig } from "@pandacss/dev"

import { baseConfig } from "@taxdom/ui/preset"

export default defineConfig({
  ...baseConfig,
  hash: {
    className: true,
    cssVar: false,
  },
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
})
