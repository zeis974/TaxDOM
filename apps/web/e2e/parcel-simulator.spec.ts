import { expect, test } from "@playwright/test"
import { mockApi } from "./mocks"

test("renders the parcel simulator form", async ({ page }) => {
  await mockApi(page)
  await page.goto("/simulator")

  await expect(page.getByRole("combobox", { name: "Origine" })).toBeVisible()
  await expect(page.getByRole("combobox", { name: "Transporteur" })).toBeVisible()
  await expect(page.getByLabel("Prix de livraison € (HT)")).toBeVisible()
  await expect(page.getByRole("button", { name: "Calculer" })).toBeVisible()
})
