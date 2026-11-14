import { expect, type Locator, type Page } from "@playwright/test"

/**
 * Next.js server-renders the markup, so a locator can be visible (and a click can be
 * dropped) before React has attached its handlers. Hydrated DOM nodes carry React's
 * internal `__reactFiber$*` property — the only "handlers are live" signal available
 * without app changes. React internal; revisit if React changes it.
 */
export async function waitForHydration(page: Page, timeout = 15_000) {
  try {
    await page.waitForFunction(
      () => Object.keys(document.body).some((key) => key.startsWith("__reactFiber$")),
      undefined,
      { timeout },
    )
  } catch (error) {
    throw new Error(
      `Page did not hydrate within ${timeout}ms: no __reactFiber$ marker appeared. ` +
        "If React changed its internal DOM keys, update waitForHydration in e2e/helpers.ts.",
      { cause: error },
    )
  }
}

/**
 * Opens a BaseSelect listbox. Retries the focus interaction because a focus that
 * happens while React is still hydrating never reaches the component: the input stays
 * focused and no later event fires, so a one-shot `focus()` would hang.
 */
export async function openSelect(page: Page, input: Locator): Promise<Locator> {
  const listbox = page.getByRole("listbox")

  await expect(async () => {
    if ((await input.getAttribute("aria-expanded")) !== "true") await input.click()
    await expect(listbox).toBeVisible()
  }).toPass({ timeout: 15_000 })

  return listbox
}

/** Picks an option like a user would and checks the selection round-trips to the field. */
export async function chooseOption(page: Page, input: Locator, name: string) {
  const listbox = await openSelect(page, input)
  await listbox.getByRole("option", { name, exact: true }).click()

  await expect(input).toHaveValue(name)
  await expect(page.getByRole("listbox")).toBeHidden()
}
