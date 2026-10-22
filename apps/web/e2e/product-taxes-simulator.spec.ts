import { expect, test } from "@playwright/test"
import { mockApi } from "./mocks"

test.beforeEach(async ({ page }) => {
  await mockApi(page)
  await page.goto("/")
})

test("renders the product taxes form", async ({ page }) => {
  await expect(page).toHaveTitle(/TaxDOM/)
  await expect(page.getByLabel("Produit")).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Territoire d'origine" })).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Territoire d'application" })).toBeVisible()
})

test("lists origins returned by the API", async ({ page }) => {
  await page.getByRole("combobox", { name: "Territoire d'origine" }).focus()

  const listbox = page.getByRole("listbox")
  await expect(listbox.getByRole("option")).toHaveText(["ALLEMAGNE", "ESPAGNE", "FRANCE"])
})

test("filters and selects an origin from the keyboard", async ({ page }) => {
  const origin = page.getByRole("combobox", { name: "Territoire d'origine" })
  // Typing before hydration is lost, so wait for the listbox to prove React is attached
  await origin.focus()
  await expect(page.getByRole("listbox")).toBeVisible()
  await origin.fill("esp")

  await expect(page.getByRole("option")).toHaveText(["ESPAGNE"])

  await origin.press("Enter")
  await expect(origin).toHaveValue("ESPAGNE")
  await expect(page.getByRole("listbox")).toBeHidden()
})
