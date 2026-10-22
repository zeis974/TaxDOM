import { defineConfig, devices } from "@playwright/test"

const PORT = 3100

// Unreachable on purpose: e2e/mocks.ts answers every browser-side API call
const MOCK_API_URL = "http://127.0.0.1:3399"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm exec next dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      API_URL: MOCK_API_URL,
      NEXT_PUBLIC_API_URL: MOCK_API_URL,
    },
  },
})
