import type { HttpContext } from "@adonisjs/core/http"
import {
  getSynonyms,
  updateSynonyms,
  getSearchConfig,
  updateSearchConfig,
} from "#services/SynonymManager"
import { SearchConfigValidator } from "#validators/SearchConfigValidator"

export default class SearchConfigController {
  async getSynonyms({ response }: HttpContext) {
    const synonyms = await getSynonyms()
    return response.json({ synonyms })
  }

  async updateSynonyms({ request, response }: HttpContext) {
    const { synonyms } = request.only(["synonyms"])
    if (!synonyms || typeof synonyms !== "object") {
      return response.badRequest({ error: "Invalid synonyms object" })
    }
    await updateSynonyms(synonyms as Record<string, string[]>)
    return response.json({ success: true })
  }

  async getConfig({ response }: HttpContext) {
    const config = await getSearchConfig()
    return response.json(config)
  }

  async updateConfig({ request, response }: HttpContext) {
    const config = await request.validateUsing(SearchConfigValidator)
    try {
      await updateSearchConfig(config)
      return response.json({ success: true })
    } catch (error) {
      return response.status(502).json({
        success: false,
        error: "Failed to update Meilisearch configuration",
        details: error instanceof Error ? error.message : String(error),
      })
    }
  }
}
