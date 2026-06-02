import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"
import { db } from "#config/database"
import { ritaSyncRuns } from "#database/schema"
import { CustomsNomenclaturesService } from "#services/CustomsNomenclaturesService"
import { RitaSyncService } from "#services/RitaSyncService"

@inject()
export default class CustomsNomenclaturesController {
  constructor(private nomenclaturesService: CustomsNomenclaturesService) {}

  async chapters({ response }: HttpContext) {
    const chapters = await this.nomenclaturesService.listChapters()
    return response.ok({ data: chapters })
  }

  async tree({ request, response }: HttpContext) {
    const chapter = Number(request.qs().chapter)

    if (!Number.isInteger(chapter) || chapter < 1 || chapter > 99) {
      return response.badRequest({ error: "chapter must be an integer between 1 and 99" })
    }

    const tree = await this.nomenclaturesService.getTree(chapter)
    return response.ok({ data: tree })
  }

  async search({ request, response }: HttpContext) {
    const q = String(request.qs().q ?? "").trim()

    if (q.length < 2) {
      return response.badRequest({ error: "q must be at least 2 characters" })
    }

    const results = await this.nomenclaturesService.search(q)
    return response.ok({ data: results })
  }

  async products({ params, response }: HttpContext) {
    const code = String(params.code ?? "").trim()

    if (!/^\d{1,10}$/.test(code)) {
      return response.badRequest({ error: "code must be 1 to 10 digits" })
    }

    const data = await this.nomenclaturesService.listProductsByPrefix(code)
    return response.ok({ data })
  }

  async triggerSync({ response }: HttpContext) {
    // Create a master run record to track the full 99-chapter sync
    const runId = uuidv7()
    await db.insert(ritaSyncRuns).values({
      id: runId,
      startedAt: new Date(),
      status: "running",
    })

    // Fire-and-forget in the background
    runFullSync(runId).catch(() => {})

    return response.ok({ runId })
  }

  async syncStream({ params, response }: HttpContext) {
    const { runId } = params

    response.header("Content-Type", "text/event-stream")
    response.header("Cache-Control", "no-cache")
    response.header("Connection", "keep-alive")

    const stream = response.response
    const POLL_INTERVAL_MS = 2000
    const MAX_WAIT_MS = 25 * 60 * 1000

    stream.write("retry: 5000\n\n")

    let elapsed = 0

    while (elapsed < MAX_WAIT_MS) {
      const run = await db.query.ritaSyncRuns.findFirst({
        where: eq(ritaSyncRuns.id, runId),
      })

      if (!run) {
        stream.write(`event: error\ndata: ${JSON.stringify({ error: "Run not found" })}\n\n`)
        break
      }

      if (run.status === "ok" || run.status === "error") {
        stream.write(
          `event: done\ndata: ${JSON.stringify({
            runId: run.id,
            status: run.status,
            rowsImported: run.rowsImported,
          })}\n\n`,
        )
        break
      }

      // While running, emit progress from the progress field
      stream.write(
        `event: progress\ndata: ${JSON.stringify({
          runId: run.id,
          status: run.status,
          chapter: run.chapter,
        })}\n\n`,
      )

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
      elapsed += POLL_INTERVAL_MS
    }

    stream.end()
  }
}

// Tracks in-flight sync to prevent concurrent runs
let syncInProgress = false

async function runFullSync(masterRunId: string): Promise<void> {
  if (syncInProgress) {
    await db
      .update(ritaSyncRuns)
      .set({
        finishedAt: new Date(),
        status: "error",
        errorMessage: "Another sync is already in progress",
      })
      .where(eq(ritaSyncRuns.id, masterRunId))
    return
  }

  syncInProgress = true
  const service = new RitaSyncService(db)

  try {
    // syncAllChapters already accumulates the imported rows; just feed progress
    // back to the master run instead of re-querying each chapter (no N+1).
    const { totalImported } = await service.syncAllChapters(async (chapter) => {
      await db
        .update(ritaSyncRuns)
        .set({ chapter, status: "running" })
        .where(eq(ritaSyncRuns.id, masterRunId))
    })

    await db
      .update(ritaSyncRuns)
      .set({ finishedAt: new Date(), status: "ok", rowsImported: totalImported })
      .where(eq(ritaSyncRuns.id, masterRunId))

    // After sync, reindex Meilisearch
    const nomenclaturesService = new CustomsNomenclaturesService(db)
    await nomenclaturesService.configureIndex()
    await nomenclaturesService.reindexToMeilisearch()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await db
      .update(ritaSyncRuns)
      .set({ finishedAt: new Date(), status: "error", errorMessage: message })
      .where(eq(ritaSyncRuns.id, masterRunId))
  } finally {
    syncInProgress = false
  }
}
