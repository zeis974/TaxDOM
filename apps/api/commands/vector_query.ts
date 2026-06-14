import { args, BaseCommand } from "@adonisjs/core/ace"
import type { CommandOptions } from "@adonisjs/core/types/ace"

import { extractProductFromUrl } from "#services/MerchantUrlParser"
import { searchSimilarProducts } from "#services/VectorSearch"

/**
 * Validation tool: resolves a free-text product name OR a merchant URL into its
 * nearest catalogue products + categories. The same pipeline the resolver uses.
 *   node ace vector:query "iphone"
 *   node ace vector:query "https://www.fnac.com/Xiaomi-15-15-Ultra/.../nsh565491/w-4"
 */
export default class VectorQuery extends BaseCommand {
  static commandName = "vector:query"
  static description = "Recherche sémantique : texte ou URL marchand → produits/catégories proches"
  static options: CommandOptions = { startApp: true }

  @args.string({ description: "Texte produit ou URL marchand" })
  declare input: string

  async run() {
    let query = this.input.trim()

    if (/^https?:\/\//i.test(query)) {
      const extracted = extractProductFromUrl(query)
      if (!extracted) {
        this.logger.error("Site non compatible (aucun nom extractible de l'URL)")
        this.exitCode = 1
        return
      }
      this.logger.info(`URL → "${extracted.productName}" (${extracted.merchant})`)
      query = extracted.productName
    }

    const hits = await searchSimilarProducts(query, { limit: 10 })

    if (!hits.length) {
      this.logger.warning("Aucun résultat (Chroma/Ollama indisponible ou catalogue vide ?)")
      return
    }

    this.logger.info(`Top ${hits.length} pour "${query}" :`)
    for (const [i, hit] of hits.entries()) {
      this.logger.log(
        `  ${String(i + 1).padStart(2)}. ${hit.productName}  →  ${hit.categoryName}  (dist ${hit.distance.toFixed(4)})`,
      )
    }
  }
}
