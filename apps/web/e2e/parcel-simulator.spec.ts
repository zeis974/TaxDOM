import { expect, test } from "@playwright/test"

import { openSelect, waitForHydration } from "./helpers"
import { mockApi, transporters } from "./mocks"

test.beforeEach(async ({ page }) => {
  await mockApi(page)
  await page.goto("/simulator")
  await waitForHydration(page)
})

test("renders the parcel simulator form", async ({ page }) => {
  await expect(page.getByRole("combobox", { name: "Origine" })).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Territoire d'application" })).toBeVisible()
  // The radio inputs are display:none (styled labels instead), so match their text.
  await expect(page.getByText("Envoi entre particulier ?")).toBeVisible()
  await expect(page.getByText("Oui", { exact: true })).toBeVisible()
  await expect(page.getByText("Non", { exact: true })).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Transporteur" })).toBeVisible()
  await expect(page.getByLabel("Prix de livraison € (HT)")).toBeVisible()
  await expect(page.getByRole("button", { name: "Calculer" })).toBeVisible()
})

// Guards the hydration crash where merging the initial server state wiped the form values.
test("keeps the default form values once hydrated", async ({ page }) => {
  await expect(page.getByText("Valeur en douane : 0.00 € (HT)")).toBeVisible()
  await expect(page.getByText("Pays : REUNION")).toBeVisible()
})

test("updates the customs value as the delivery price changes", async ({ page }) => {
  await page.getByLabel("Prix de livraison € (HT)").fill("12")

  await expect(page.getByText("Valeur en douane : 12.00 € (HT)")).toBeVisible()
})

test("lists transporters returned by the API", async ({ page }) => {
  const listbox = await openSelect(page, page.getByRole("combobox", { name: "Transporteur" }))

  await expect(listbox.getByRole("option")).toHaveText(transporters.map((t) => t.name))
})
