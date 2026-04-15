import type { HttpContext } from "@adonisjs/core/http"
import {
  getSynonyms,
  updateSynonyms,
  getSearchConfig,
  updateSearchConfig,
} from "#services/SynonymManager"

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
    const config = request.only([
      "searchableAttributes",
      "displayedAttributes",
      "sortableAttributes",
      "filterableAttributes",
      "typoTolerance",
      "rankingRules",
    ])
    await updateSearchConfig(config as Parameters<typeof updateSearchConfig>[0])
    return response.json({ success: true })
  }
}
