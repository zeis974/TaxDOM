import { expect, test } from "@playwright/test"

import { chooseOption, openSelect, waitForHydration } from "./helpers"
import { mockApi, origins } from "./mocks"

test.beforeEach(async ({ page }) => {
  await mockApi(page)
  await page.goto("/")
  await waitForHydration(page)
})

test("renders the product taxes form", async ({ page }) => {
  await expect(page).toHaveTitle(/TaxDOM/)
  await expect(page.getByLabel("Produit")).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Territoire d'origine" })).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Territoire d'application" })).toBeVisible()
})

test("fills the origin select from the mocked API origin", async ({ page }) => {
  const apiOrigins = new Set<string>()
  page.on("request", (request) => {
    const url = new URL(request.url())
    if (url.pathname.startsWith("/v1/public/")) apiOrigins.add(url.origin)
  })
  // Reload so the listener sees the requests made by a fresh page load.
  await page.reload()
  await waitForHydration(page)

  const origin = page.getByRole("combobox", { name: "Territoire d'origine" })
  const listbox = await openSelect(page, origin)
  await expect(listbox.getByRole("option")).toHaveText(origins.map((o) => o.name))

  // Proves webServer.env beat .env: the suite must never call a real backend.
  expect([...apiOrigins]).toEqual(["http://127.0.0.1:3399"])
})

test("filters origins from the keyboard and selects one", async ({ page }) => {
  const origin = page.getByRole("combobox", { name: "Territoire d'origine" })
  await openSelect(page, origin)
  await origin.fill("esp")

  await expect(page.getByRole("option")).toHaveText(["ESPAGNE"])

  await origin.press("Enter")
  await expect(origin).toHaveValue("ESPAGNE")
  await expect(page.getByRole("listbox")).toBeHidden()
})

test("filters the application territory list", async ({ page }) => {
  const territory = page.getByRole("combobox", { name: "Territoire d'application" })
  await expect(territory).toHaveValue("REUNION")

  await territory.fill("gua")
  await expect(page.getByRole("listbox").getByRole("option")).toHaveText(["GUADELOUPE"])
})

test("searches products through the debounced search endpoint", async ({ page }) => {
  const searched: string[] = []
  page.on("request", (request) => {
    const url = new URL(request.url())
    if (url.pathname === "/v1/public/products/search") {
      searched.push(url.searchParams.get("name") ?? "")
    }
  })

  const product = page.getByLabel("Produit")
  await product.click()
  await product.fill("ord")

  // The option only exists if the typed value made it through the 300 ms debounce.
  await chooseOption(page, product, "Ordinateur portable")
  expect(searched).toContain("ord")
})

test("submits nothing without a captcha token", async ({ page }) => {
  const posts: string[] = []
  page.on("request", (request) => {
    if (request.method() !== "POST") return
    const { pathname } = new URL(request.url())
    if (pathname === "/api/product-taxes") posts.push(pathname)
  })

  await page.getByRole("button", { name: "Rechercher" }).click()

  await expect(page.locator("[data-sonner-toast]")).toContainText("Captcha invalide")
  expect(posts).toEqual([])
})
