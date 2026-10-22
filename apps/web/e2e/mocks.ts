import type { Page } from "@playwright/test"

export const origins = [{ name: "ALLEMAGNE" }, { name: "ESPAGNE" }, { name: "FRANCE" }]
export const territories = [{ name: "GUADELOUPE" }, { name: "REUNION" }]

/** Answers the public API from fixtures and keeps third-party scripts off the network. */
export async function mockApi(page: Page) {
  await page.route("https://challenges.cloudflare.com/**", (route) => route.abort())
  await page.route("**/v1/public/**", (route) => route.fulfill({ status: 503, json: {} }))
  await page.route("**/v1/public/origins*", (route) => route.fulfill({ json: origins }))
  await page.route("**/v1/public/territories*", (route) => route.fulfill({ json: territories }))
  await page.route("**/v1/public/simulator/templates*", (route) => route.fulfill({ json: [] }))
}
