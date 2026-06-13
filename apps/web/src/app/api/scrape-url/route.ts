import { apiClient } from "@/lib/api/api-server"

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

    const res = await apiClient.api.scrapeProductUrl({ body: { url } })
    return Response.json(res)
  } catch (e: unknown) {
    const status = (e as { status?: number })?.status

    if (status === 422) {
      return Response.json(
        { error: "Site non compatible", code: "UNSUPPORTED_MERCHANT" },
        { status: 422 },
      )
    }

    console.error(e)
    return Response.json(
      { error: "Impossible de lire cette page", message: (e as Error).message },
      { status: 500 },
    )
  }
}
