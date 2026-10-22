import { describe, expect, it } from "vitest"
import { getCountryFlag, normalizeCountryName } from "./countryFlags"

describe("normalizeCountryName", () => {
  it("strips accents, separators and case", () => {
    expect(normalizeCountryName("Nouvelle-Zélande")).toBe("NOUVELLEZELANDE")
    expect(normalizeCountryName("îles   salomon")).toBe("ILESSALOMON")
  })
})

describe("getCountryFlag", () => {
  it("resolves accented and unaccented variants", () => {
    expect(getCountryFlag("GRÈCE")).toBe("gr")
    expect(getCountryFlag("grece")).toBe("gr")
  })

  it("resolves names whose separators differ from the mapping", () => {
    expect(getCountryFlag("PAYS BAS")).toBe("nl")
  })

  it("returns undefined for unmapped countries", () => {
    expect(getCountryFlag("ATLANTIDE")).toBeUndefined()
  })
})
