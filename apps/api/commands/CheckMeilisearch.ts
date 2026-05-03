import { BaseCommand } from "@adonisjs/core/ace"
import { getMeiliHealth } from "#lib/meilisearch"

export default class CheckMeilisearch extends BaseCommand {
  static commandName = "meilisearch:health"
  static description = "Check Meilisearch connection"

  async run() {
    const health = await getMeiliHealth()
    if (health?.status === "available") {
      console.log("Meilisearch is healthy")
    } else {
      console.error("Meilisearch is unavailable")
    }
  }
}
