import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { parseChapterXml } from "#services/RitaXmlParser"

const fixture = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url))

describe("parseChapterXml", () => {
  const rows = parseChapterXml(fixture("chapter_85.xml"), 85)
  const byCode = new Map(rows.map((row) => [row.code, row]))

  it("reads the table date as validAt", () => {
    expect(rows.every((row) => row.validAt === "2026-05-29")).toBe(true)
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
})
