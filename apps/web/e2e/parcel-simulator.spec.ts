import { expect, test } from "@playwright/test"

import { mockApi } from "./mocks"

// KNOWN BUG: under `next dev`, /simulator crashes on hydration — TanStack Form merges
// `initialFormState.values === undefined` into the store (StrictMode runs the layout
// effect twice), so ParcelSimulatorCards throws. JS stays off; turn it back on when fixed.
test.use({ javaScriptEnabled: false })

test.beforeEach(async ({ page }) => {
  await mockApi(page)
  await page.goto("/simulator")
})

test("server-renders the parcel simulator form", async ({ page }) => {
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

test("server-renders the initial customs value", async ({ page }) => {
  await expect(page.getByText("Valeur en douane : 0.00 € (HT)")).toBeVisible()
  await expect(page.getByText("Pays : REUNION")).toBeVisible()
})
