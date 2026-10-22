import type { Page, Route } from "@playwright/test"

export const origins = [{ name: "ALLEMAGNE" }, { name: "ESPAGNE" }, { name: "FRANCE" }]
export const territories = [{ name: "GUADELOUPE" }, { name: "REUNION" }]
export const transporters = [{ name: "COLISSIMO" }, { name: "DHL" }]

// The API serialises ids as strings; the app maps them with Number().
export const templates = [
  {
    templateID: "1",
    templateName: "Électronique",
    products: [
      { productID: "10", productName: "Ordinateur portable" },
      { productID: "11", productName: "Téléphone mobile" },
    ],
  },
]

// Only these queries match, so an option on screen proves the typed query reached
// the search endpoint.
const productSearch: Record<string, { name: string }[]> = {
  ord: [{ name: "Ordinateur portable" }],
  tel: [{ name: "Téléphone mobile" }],
}

const json = (route: Route, body: unknown, status = 200) => route.fulfill({ status, json: body })

/**
 * Answers the public API from fixtures and keeps third-party scripts off the network.
 *
 * Playwright matches the most recently registered route first, so several overlapping
 * globs would silently shadow each other. A single catch-all dispatcher keeps the
 * matching order explicit; unmatched endpoints answer 503 so a missing fixture fails
 * loudly instead of being swallowed by a broader route.
 */
export async function mockApi(page: Page) {
  await page.route("https://challenges.cloudflare.com/**", (route) => route.abort())

  await page.route("**/v1/public/**", (route) => {
    const url = new URL(route.request().url())

    if (url.pathname === "/v1/public/origins") return json(route, origins)
    if (url.pathname === "/v1/public/territories") return json(route, territories)
    if (url.pathname === "/v1/public/transporters") return json(route, transporters)
    if (url.pathname === "/v1/public/simulator/templates") return json(route, templates)
    if (url.pathname === "/v1/public/products/search") {
      const name = url.searchParams.get("name")?.toLowerCase() ?? ""
      return json(route, { success: true, data: productSearch[name] ?? [] })
    }

    return json(route, { error: `No fixture for ${url.pathname}` }, 503)
  })
}
