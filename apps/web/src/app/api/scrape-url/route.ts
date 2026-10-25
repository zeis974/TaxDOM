import { apiErrorResponse } from "@/lib/api/api-error"
import { apiClient } from "@/lib/api/api-server"
import { clientIpHeaders } from "@/lib/api/client-ip"

function looksLikeUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const url = typeof body?.url === "string" ? body.url.trim() : ""

    if (!url || !looksLikeUrl(url)) {
      return Response.json({ error: "URL invalide" }, { status: 400 })
    }

    const res = await apiClient.api.scrapeProductUrl({
      body: { url },
      headers: clientIpHeaders(request.headers),
    })
    return Response.json(res)
  } catch (e) {
    return apiErrorResponse(e, "scrape-url", "Impossible de lire cette page")
  }
}
