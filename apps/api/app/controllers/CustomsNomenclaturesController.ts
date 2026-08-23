import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { desc, eq, isNotNull } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"
import { db } from "#config/database"
import { ritaSyncRuns } from "#database/schema"
// Value import (not `import type`): @inject() needs the runtime class for DI metadata.
import { CustomsNomenclaturesService } from "#services/CustomsNomenclaturesService"
import { RitaSyncService } from "#services/RitaSyncService"

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const MAX_CONCURRENT_SYNC_STREAMS = 4
let activeSyncStreams = 0

// A full RITA sync (99 chapters) is a heavy, rate-limited scrape against the
// douane.gouv.fr site — restrict it to once per day.
const SYNC_COOLDOWN_MS = 24 * 60 * 60 * 1000

async function findLastOkRun() {
  return db.query.ritaSyncRuns.findFirst({
    where: eq(ritaSyncRuns.status, "ok"),
    orderBy: [desc(ritaSyncRuns.finishedAt)],
  })
}

function nextSyncAvailableAt(lastOkFinishedAt: Date | null): Date | null {
  if (!lastOkFinishedAt) return null
  const nextAt = new Date(lastOkFinishedAt.getTime() + SYNC_COOLDOWN_MS)
  return nextAt > new Date() ? nextAt : null
}

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

  async lastSync({ response }: HttpContext) {
    const run = await db.query.ritaSyncRuns.findFirst({
      where: isNotNull(ritaSyncRuns.finishedAt),
      orderBy: [desc(ritaSyncRuns.finishedAt)],
    })
    const lastOkRun = await findLastOkRun()

    return response.ok({
      data: run
        ? {
            finishedAt: run.finishedAt,
            status: run.status,
            rowsImported: run.rowsImported,
            nextSyncAvailableAt: nextSyncAvailableAt(lastOkRun?.finishedAt ?? null),
          }
        : null,
    })
  }

  async triggerSync({ response }: HttpContext) {
    const lastOkRun = await findLastOkRun()
    const nextAt = nextSyncAvailableAt(lastOkRun?.finishedAt ?? null)

    if (nextAt) {
      return response.status(429).json({
        error: "Une synchronisation a déjà été effectuée aujourd'hui",
        nextSyncAvailableAt: nextAt,
      })
    }

    // Create a master run record to track the full 99-chapter sync
    const runId = uuidv7()
    await db.insert(ritaSyncRuns).values({
      id: runId,
      startedAt: new Date(),
      status: "running",
    })

    // Fire-and-forget in the background
    runFullSync(runId).catch((err) =>
      logger.error("RITA full sync failed for run %s: %O", runId, err),
    )

    return response.ok({ runId })
  }

  async syncStream({ params, response }: HttpContext) {
    const { runId } = params

    // Unvalidated ids reach Postgres as a uuid cast and throw a 500 instead of
    // a clean client error.
    if (typeof runId !== "string" || !UUID_REGEX.test(runId)) {
      return response.badRequest({ error: "runId must be a UUID" })
    }

    // Each stream holds a connection for up to 25 minutes and polls the DB every
    // 2s; without a ceiling a handful of stale browser tabs can drain the pool.
    if (activeSyncStreams >= MAX_CONCURRENT_SYNC_STREAMS) {
      return response.tooManyRequests({ error: "Too many concurrent sync streams" })
    }

    activeSyncStreams += 1

    try {
      await this.pipeSyncStream(runId, response)
    } finally {
      activeSyncStreams -= 1
    }
  }

  private async pipeSyncStream(runId: string, response: HttpContext["response"]) {
    // Writing straight to the raw Node response below bypasses Adonis's own
    // header-flush cycle, so `response.header()` never reaches the client —
    // set headers on the raw response instead, before the first write.
    const stream = response.response
    stream.setHeader("Content-Type", "text/event-stream")
    stream.setHeader("Cache-Control", "no-cache")
    stream.setHeader("Connection", "keep-alive")

    // 'close' fires when the client disconnects; without this check the loop
    // would keep polling the DB for up to MAX_WAIT_MS per abandoned tab.
    let clientGone = false
    const onClose = () => {
      clientGone = true
    }
    stream.on("close", onClose)

    try {
      await this.pollRunStatus(runId, stream, () => clientGone)
    } finally {
      stream.off("close", onClose)
    }
  }

  private async pollRunStatus(
    runId: string,
    stream: HttpContext["response"]["response"],
    isClientGone: () => boolean,
  ) {
    const POLL_INTERVAL_MS = 2000
    const MAX_WAIT_MS = 25 * 60 * 1000

    stream.write("retry: 5000\n\n")

    let elapsed = 0

    while (elapsed < MAX_WAIT_MS) {
      if (isClientGone() || stream.destroyed || stream.writableEnded) {
        return
      }

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
    // Nomenclature search runs on plain SQL against this table — no reindex needed.
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
