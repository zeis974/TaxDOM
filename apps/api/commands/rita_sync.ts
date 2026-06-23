import { BaseCommand, flags } from "@adonisjs/core/ace"
import { db } from "#config/database"
import { RitaSyncService } from "#services/RitaSyncService"

export default class RitaSync extends BaseCommand {
  static commandName = "rita:sync"
  static description = "Synchronise les nomenclatures SH depuis RITA (tous chapitres ou un seul)"

  @flags.number({ description: "Chapitre à synchroniser (1-99). Omis = tous les chapitres." })
  declare chapter: number | undefined

  async run() {
    const service = new RitaSyncService(db)

    if (this.chapter !== undefined) {
      if (this.chapter < 1 || this.chapter > 99) {
        this.logger.error("Le chapitre doit être compris entre 1 et 99")
        this.exitCode = 1
        return
      }

      this.logger.info(`Synchronisation du chapitre ${this.chapter}...`)
      try {
        const result = await service.syncChapter(this.chapter)
        this.logger.success(`Chapitre ${result.chapter} : ${result.rowsImported} lignes importées`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        this.logger.error(`Échec du chapitre ${this.chapter} : ${message}`)
        this.exitCode = 1
      }
      return
    }

    this.logger.info("Synchronisation des 99 chapitres RITA...")

    const result = await service.syncAllChapters((chapter, total, status) => {
      if (status === "ok") {
        this.logger.info(`[${chapter}/${total}] Chapitre ${chapter} OK`)
      } else {
        this.logger.warning(`[${chapter}/${total}] Chapitre ${chapter} ERREUR`)
      }
    })

    this.logger.success(
      `Sync terminée — ${result.totalImported} lignes importées, ${result.failedChapters.length} chapitres en erreur`,
    )

    if (result.failedChapters.length > 0) {
      this.logger.warning(`Chapitres en erreur : ${result.failedChapters.join(", ")}`)
      this.exitCode = 1
    }
  }
}
