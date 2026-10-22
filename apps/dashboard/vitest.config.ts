import { defineConfig } from "vitest/config"

// Kept apart from vite.config.ts so tests don't boot the TanStack Start and Nitro plugins
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
})
