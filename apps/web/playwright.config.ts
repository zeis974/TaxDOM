import { defineConfig, devices } from "@playwright/test"

const PORT = 3100

// Unreachable on purpose: e2e/mocks.ts answers every browser-side API call, and a
// request that slips through fails fast instead of reaching a real backend.
const MOCK_API_URL = "http://127.0.0.1:3399"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  // `next dev` compiles a route on its first visit, which can take a while when
  // several workers hit a cold server at once.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm exec next dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    // Reused locally, but it must be this checkout: the env vars below are only
    // injected when Playwright owns the process. PLAYWRIGHT_REUSE_SERVER=0 forces a
    // fresh server.
    reuseExistingServer: !process.env.CI && process.env.PLAYWRIGHT_REUSE_SERVER !== "0",
    timeout: 180_000,
    // These win over apps/web/.env: Next never overrides env vars already set in the process.
    env: {
      API_URL: MOCK_API_URL,
      NEXT_PUBLIC_API_URL: MOCK_API_URL,
      // Test key; mocks.ts aborts the Cloudflare script, so submissions have no token.
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
    },
  },
})
