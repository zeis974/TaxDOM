import { existsSync } from "node:fs"
import { eq, sql } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

import type * as schema from "#database/schema"
import { customsNomenclatures, ritaSyncRuns } from "#database/schema"
import { parseChapterXml, xmlPathForChapter } from "#services/RitaXmlParser"
import type { NomenclatureRow } from "#services/RitaXmlParser"
import { v7 as uuidv7 } from "uuid"

export type { NomenclatureRow }

type DB = NodePgDatabase<typeof schema>

const CHAPTER_COUNT = 99
const BATCH_SIZE = 500

export type SyncChapterResult = {
  chapter: number
  rowsImported: number
}

export type SyncAllResult = {
  totalImported: number
  failedChapters: number[]
}

export class RitaSyncService {
  constructor(private db: DB) {}

  async syncChapter(chapter: number): Promise<SyncChapterResult> {
    const runID = uuidv7()

    await this.db.insert(ritaSyncRuns).values({
      id: runID,
      startedAt: new Date(),
      chapter,
      status: "running",
    })

    try {
      const xmlPath = xmlPathForChapter(chapter)

      if (!existsSync(xmlPath)) {
        throw new Error(
          `XML file not found: ${xmlPath} — run "python tools/download_rita.py" first`,
        )
      }

      const rows = parseChapterXml(xmlPath, chapter)

      if (rows.length === 0) {
        // Reserved chapter (e.g. chapter 77) — no nomenclature entries
        await this.db
          .update(ritaSyncRuns)
          .set({ finishedAt: new Date(), rowsImported: 0, status: "ok" })
          .where(eq(ritaSyncRuns.id, runID))
        console.log(`[rita] chapter ${chapter} skipped — reserved/empty`)
        return { chapter, rowsImported: 0 }
      }

      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE)
        await this.db
          .insert(customsNomenclatures)
          .values(
            batch.map((r) => ({
              code: r.code,
              parentCode: r.parentCode,
              description: r.description,
              alinea: r.alinea,
              type: r.type,
              chapter: r.chapter,
              validAt: r.validAt,
              updatedAt: new Date(),
            })),
          )
          .onConflictDoUpdate({
            target: customsNomenclatures.code,
            set: {
              parentCode: sql`excluded.parent_code`,
              description: sql`excluded.description`,
              alinea: sql`excluded.alinea`,
              type: sql`excluded.type`,
              chapter: sql`excluded.chapter`,
              validAt: sql`excluded.valid_at`,
              updatedAt: sql`excluded.updated_at`,
            },
          })
      }

      await this.db
        .update(ritaSyncRuns)
        .set({ finishedAt: new Date(), rowsImported: rows.length, status: "ok" })
        .where(eq(ritaSyncRuns.id, runID))

      console.log(`[rita] chapter ${chapter} synced — ${rows.length} rows`)
      return { chapter, rowsImported: rows.length }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      await this.db
        .update(ritaSyncRuns)
        .set({ finishedAt: new Date(), rowsImported: 0, status: "error", errorMessage: message })
        .where(eq(ritaSyncRuns.id, runID))
      console.error(`[rita] chapter ${chapter} FAILED: ${message}`)
      throw error
    }
  }

  async syncAllChapters(
    onProgress?: (chapter: number, total: number, status: "ok" | "error") => void,
  ): Promise<SyncAllResult> {
    let totalImported = 0
    const failedChapters: number[] = []

    for (let chapter = 1; chapter <= CHAPTER_COUNT; chapter++) {
      try {
        const result = await this.syncChapter(chapter)
        totalImported += result.rowsImported
        onProgress?.(chapter, CHAPTER_COUNT, "ok")
      } catch {
        failedChapters.push(chapter)
        onProgress?.(chapter, CHAPTER_COUNT, "error")
      }
    }

    return { totalImported, failedChapters }
  }

  async getRunStatus(runId: string) {
    return this.db.query.ritaSyncRuns.findFirst({
      where: eq(ritaSyncRuns.id, runId),
    })
  }
}
