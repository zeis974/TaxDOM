import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { XMLParser } from "fast-xml-parser"

export type NomenclatureRow = {
  code: string
  parentCode: string | null
  description: string
  alinea: number
  type: number
  chapter: number
  validAt: string
}

const DATA_DIR =
  process.env.RITA_LOCAL_DATA_PATH ?? resolve(process.cwd(), "../../data/rita/xml")

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: true,
  trimValues: true,
})

export function xmlPathForChapter(chapter: number): string {
  return resolve(DATA_DIR, `chapter_${String(chapter).padStart(2, "0")}.xml`)
}

export function parseChapterXml(xmlPath: string, chapter: number): NomenclatureRow[] {
  const raw = readFileSync(xmlPath, "utf-8")
  const doc = parser.parse(raw) as RitaXmlDoc

  const caract = doc?.table?.caracteristiques
  let validAt = new Date().toISOString().slice(0, 10)
  if (caract?.date_table) {
    const s = String(caract.date_table)
    if (s.length === 8) validAt = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`
  }

  const contenu = doc?.table?.contenu
  if (!contenu) return [] // reserved chapter (e.g. chapter 77)

  const lignes = toArray(contenu.ligne)
  const rows: NomenclatureRow[] = []

  // stack holds (alinea, code) of the current ancestor chain.
  // stack[0] is always the chapter root (the very first row).
  const stack: Array<[number, string]> = []

  for (const ligne of lignes) {
    const code = String(ligne.Code ?? "").trim()
    if (!code) continue

    const description = String(ligne.Description ?? "").trim()
    const alinea = Number(ligne.Alinea ?? 0)
    const type = Number(ligne.Type ?? 0)

    // RITA uses the same code at two consecutive alinea levels:
    // the first occurrence is a label, the second is the actual entry.
    // Remove any prior stack entry for this code so siblings at the same
    // depth don't become children of the label occurrence.
    const cleanedStack = stack.filter(([, c]) => c !== code)
    stack.length = 0
    stack.push(...cleanedStack)

    let parentCode: string | null

    if (stack.length === 0) {
      // Chapter root — first row
      parentCode = null
    } else if (alinea === 0) {
      // Heading: direct child of the chapter root
      const chapterRoot = stack[0]
      parentCode = chapterRoot[1]
      stack.splice(1) // keep only root
    } else {
      // Normal depth: pop until a strictly shallower ancestor
      while (stack.length > 0 && stack[stack.length - 1][0] >= alinea) {
        stack.pop()
      }
      parentCode = stack.length > 0 ? stack[stack.length - 1][1] : null
    }

    stack.push([alinea, code])

    rows.push({ code, parentCode, description, alinea, type, chapter, validAt })
  }

  // RITA repeats some codes — keep the last occurrence per code
  // (more specific description) but parentCode is already correct.
  const seen = new Map<string, number>()
  rows.forEach((r, i) => seen.set(r.code, i))
  return [...seen.values()].sort((a, b) => a - b).map((i) => rows[i])
}

// ── internal XML shape ────────────────────────────────────────────────────────

type RitaXmlDoc = {
  table?: {
    caracteristiques?: { date_table?: string | number }
    contenu?: { ligne: RitaLigne | RitaLigne[] }
  }
}

type RitaLigne = {
  Code?: string | number
  Description?: string | number
  Alinea?: string | number
  Type?: string | number
}

function toArray<T>(v: T | T[] | undefined): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}
