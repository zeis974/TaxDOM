import { fileURLToPath } from "node:url"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { parseChapterXml } from "#services/RitaXmlParser"

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url))

describe("parseChapterXml", () => {
  const rows = parseChapterXml(fixture("chapter_85.xml"), 85)
  const byCode = new Map(rows.map((row) => [row.code, row]))

  it("reads the table date as validAt", () => {
    expect(rows).not.toHaveLength(0)
    expect(new Set(rows.map((row) => row.validAt))).toEqual(new Set(["2026-05-29"]))
  })

  it("roots the tree on the first row", () => {
    expect(rows[0]).toMatchObject({ code: "8500000000", parentCode: null, alinea: 0 })
  })

  it("attaches alinea 0 headings to the chapter root", () => {
    expect(byCode.get("8501000000")?.parentCode).toBe("8500000000")
  })

  it("keeps the last occurrence of a code repeated as label then entry", () => {
    expect(rows.filter((row) => row.code === "8501100000")).toHaveLength(1)
    expect(byCode.get("8501100000")).toMatchObject({
      parentCode: "8501000000",
      alinea: 2,
      type: 1,
      description: "d'une puissance n'excédant pas 37,5 W",
    })
  })

  it("does not nest siblings under the label occurrence", () => {
    expect(byCode.get("8501200000")?.parentCode).toBe("8501000000")
  })

  it("attaches deeper rows to the closest shallower ancestor", () => {
    expect(byCode.get("8501201000")?.parentCode).toBe("8501200000")
    expect(byCode.get("8501209000")?.parentCode).toBe("8501200000")
    expect(byCode.get("8501300000")?.parentCode).toBe("8501000000")
  })

  it("returns no rows for a reserved chapter", () => {
    expect(parseChapterXml(fixture("chapter_77.xml"), 77)).toEqual([])
  })

  // fast-xml-parser turns "0100000000" into the number 100000000 (parseTagValue: true)
  it.todo("keeps the leading zero of chapters 01 to 09 codes")

  describe("without a usable table date", () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2026-01-02T03:04:05Z"))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("falls back to today when the table date is missing", () => {
      const dated = parseChapterXml(fixture("chapter_99_without_date.xml"), 99)
      expect(dated).not.toHaveLength(0)
      expect(new Set(dated.map((row) => row.validAt))).toEqual(new Set(["2026-01-02"]))
    })

    it("falls back to today when the table date is malformed", () => {
      const dated = parseChapterXml(fixture("chapter_99_malformed_date.xml"), 99)
      expect(dated).not.toHaveLength(0)
      expect(new Set(dated.map((row) => row.validAt))).toEqual(new Set(["2026-01-02"]))
    })
  })
})
