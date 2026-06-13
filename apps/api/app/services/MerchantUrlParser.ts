/**
 * Extracts a product name straight from a merchant URL — no network request,
 * no scraping. Each supported merchant exposes the product name in its URL path
 * (e.g. fnac `/Xiaomi-15-15-Ultra/...`), so we parse the slug directly.
 *
 * URLs whose host isn't in the registry, or that aren't a parseable product
 * page (homepage, category listing, bare ASIN…), return `null` — the caller
 * turns that into a "site non compatible" response. Adding a merchant is a
 * single entry in `PARSERS`.
 */

export type MerchantExtraction = {
  merchant: string
  productName: string
}

type MerchantParser = {
  name: string
  /** Registrable-domain suffixes this parser handles (without `www.`). */
  hosts: string[]
  /** Returns the raw product slug from the URL, or `null` if not a product page. */
  extract: (url: URL) => string | null
}

const PARSERS: MerchantParser[] = [
  {
    name: "fnac",
    hosts: ["fnac.com", "fnac.be", "fnac.ch"],
    // Product pages: /<product-slug>/<brand-or-series>/<id>/w-N
    // The first segment is the product; the id segment ("nsh565491") or the
    // market segment ("w-4") confirms it's a product page and not a category.
    extract: (url) => {
      const segs = pathSegments(url)
      if (segs.length === 0) return null
      const isProduct = segs.some((s) => /^[a-z]{2,4}\d{4,}$/i.test(s) || /^w-\d+$/i.test(s))
      return isProduct ? segs[0] : null
    },
  },
  {
    name: "amazon",
    hosts: ["amazon.fr", "amazon.com", "amazon.de", "amazon.es", "amazon.it", "amazon.co.uk"],
    // Product pages: /<product-slug>/dp/<ASIN> — the slug sits right before "dp".
    // Bare forms (/dp/<ASIN>, /gp/product/<ASIN>) carry no name → not compatible.
    extract: (url) => {
      const segs = pathSegments(url)
      const dpIdx = segs.findIndex((s) => s === "dp" || s === "gp")
      if (dpIdx <= 0) return null
      return segs[dpIdx - 1]
    },
  },
]

export function extractProductFromUrl(rawUrl: string): MerchantExtraction | null {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^www\./i, "").toLowerCase()
  const parser = PARSERS.find((p) => p.hosts.some((h) => host === h || host.endsWith(`.${h}`)))
  if (!parser) return null

  const slug = parser.extract(url)
  if (!slug) return null

  const productName = humanizeSlug(slug)
  if (productName.length < 2) return null

  return { merchant: parser.name, productName }
}

/** Whether a host is in the supported registry (regardless of the exact path). */
export function isSupportedMerchant(rawUrl: string): boolean {
  try {
    const host = new URL(rawUrl).hostname.replace(/^www\./i, "").toLowerCase()
    return PARSERS.some((p) => p.hosts.some((h) => host === h || host.endsWith(`.${h}`)))
  } catch {
    return false
  }
}

function pathSegments(url: URL): string[] {
  return url.pathname.split("/").filter(Boolean)
}

/** "Xiaomi-15-15-Ultra" → "Xiaomi 15 15 Ultra" (URI-decoded, separators collapsed). */
function humanizeSlug(slug: string): string {
  let s = slug
  try {
    s = decodeURIComponent(slug)
  } catch {
    // keep the raw slug if it isn't valid percent-encoding
  }
  return s
    .replace(/[-_+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
