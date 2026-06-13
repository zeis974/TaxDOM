import type { HttpContext } from "@adonisjs/core/http"

import { UnsupportedMerchantError } from "#exceptions/ServiceErrors"
import { extractProductFromUrl } from "#services/MerchantUrlParser"
import { ScrapeProductUrlValidator } from "#validators/ScrapeProductUrlValidator"

/**
 * Resolves a merchant URL to a product name by parsing the URL slug directly —
 * no page fetch, no scraping. Supported merchants expose the product name in
 * their path (e.g. fnac `/Xiaomi-15-15-Ultra/...`). Unsupported hosts, or URLs
 * that aren't a product page, raise `UnsupportedMerchantError` (422) so the
 * frontend can show a "site non compatible" hint.
 */
export default class ScrapeProductUrlController {
  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(ScrapeProductUrlValidator)

    const extracted = extractProductFromUrl(payload.url)
    if (!extracted) {
      throw new UnsupportedMerchantError()
    }

    return {
      title: extracted.productName,
      merchant: extracted.merchant,
    }
  }
}
