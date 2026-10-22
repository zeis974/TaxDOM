import { describe, expect, it } from "vitest"
import { formatHsCode, toSentenceCase } from "./format"

describe("formatHsCode", () => {
  it("formats chapters and headings", () => {
    expect(formatHsCode("8500000000")).toBe("85")
    expect(formatHsCode("0102000000")).toBe("01.02")
  })

  it("falls back to the chapter for an all-zero code", () => {
    expect(formatHsCode("0000000000")).toBe("00")
  })
})

describe("toSentenceCase", () => {
  it("capitalises the first letter and lower-cases the rest", () => {
    expect(toSentenceCase("ANIMAUX VIVANTS")).toBe("Animaux vivants")
  })

  it("returns empty strings untouched", () => {
    expect(toSentenceCase("")).toBe("")
  })
})
