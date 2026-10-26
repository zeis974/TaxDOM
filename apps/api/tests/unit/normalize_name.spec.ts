import { expect, it } from "vitest"
import { normalizeName } from "#lib/normalize_name"

it("trims and uppercases names", () => {
  expect(normalizeName("  pays-bas ")).toBe("PAYS-BAS")
})
