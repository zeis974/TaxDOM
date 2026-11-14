import { describe, expect, it } from "vitest"
import { extractProductFromUrl, isSupportedMerchant } from "#services/MerchantUrlParser"

describe("extractProductFromUrl", () => {
  it("extracts the product slug from a fnac product page", () => {
    expect(
      extractProductFromUrl("https://www.fnac.com/Xiaomi-15-Ultra/Smartphone/nsh565491/w-4"),
    ).toEqual({ merchant: "fnac", productName: "Xiaomi 15 Ultra" })
  })

  it("rejects a fnac category page", () => {
    expect(extractProductFromUrl("https://www.fnac.com/Smartphones/Telephonie")).toBeNull()
  })

  it("detects a fnac product page from its id segment alone", () => {
    expect(extractProductFromUrl("https://www.fnac.com/Casque-Sony/Audio/nsh123456")).toEqual({
      merchant: "fnac",
      productName: "Casque Sony",
    })
  })

  it("detects a fnac product page from its market segment alone", () => {
    expect(extractProductFromUrl("https://www.fnac.com/Casque-Sony/Audio/w-4")).toEqual({
      merchant: "fnac",
      productName: "Casque Sony",
    })
  })

  it("extracts the slug preceding /dp/ on amazon", () => {
    expect(
      extractProductFromUrl("https://www.amazon.fr/Apple-iPhone-16-128-Go/dp/B0DGHYDZR9"),
    ).toEqual({ merchant: "amazon", productName: "Apple iPhone 16 128 Go" })
  })

  it("rejects a bare amazon ASIN url", () => {
    expect(extractProductFromUrl("https://www.amazon.fr/dp/B0DGHYDZR9")).toBeNull()
  })

  it("extracts the slug preceding /gp/product on amazon", () => {
    expect(
      extractProductFromUrl("https://www.amazon.fr/Apple-iPhone-16/gp/product/B0DGHYDZR9"),
    ).toEqual({ merchant: "amazon", productName: "Apple iPhone 16" })
  })

  it("rejects a bare amazon /gp/product url", () => {
    expect(extractProductFromUrl("https://www.amazon.fr/gp/product/B0DGHYDZR9")).toBeNull()
  })

  it("decodes percent-encoded slugs", () => {
    expect(
      extractProductFromUrl("https://www.amazon.fr/Caf%C3%A9-Moulu_Bio/dp/B000000000")?.productName,
    ).toBe("Café Moulu Bio")
  })

  it("matches merchant subdomains", () => {
    expect(
      extractProductFromUrl("https://m.fnac.com/Casque-Sony/Audio/nsh123456/w-4")?.merchant,
    ).toBe("fnac")
  })

  it("rejects slugs that humanize to fewer than two characters", () => {
    expect(extractProductFromUrl("https://www.amazon.fr/a/dp/B0DGHYDZR9")).toBeNull()
    expect(extractProductFromUrl("https://www.amazon.fr/-/dp/B0DGHYDZR9")).toBeNull()
  })

  it("returns null for unsupported hosts and invalid urls", () => {
    expect(extractProductFromUrl("https://www.cdiscount.com/produit/dp/123")).toBeNull()
    expect(extractProductFromUrl("not a url")).toBeNull()
  })
})

describe("isSupportedMerchant", () => {
  it("checks the host only", () => {
    expect(isSupportedMerchant("https://www.amazon.de/")).toBe(true)
    expect(isSupportedMerchant("https://fnacamazon.com/")).toBe(false)
    expect(isSupportedMerchant("::")).toBe(false)
  })
})
