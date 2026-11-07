/**
 * Turns a failed API call into the response sent to the browser. A 429 keeps
 * Retry-After, so the visitor sees how long to wait instead of a generic
 * failure. Only a summary is logged, since the error object holds the API
 * request and its key, and the response never reveals the internal API address.
 */
export function apiErrorResponse(e: unknown, route: string, error: string) {
  const status = (e as { status?: number })?.status

  if (status === 429) {
    const retryAfter = (e as { rawResponse?: Response }).rawResponse?.headers.get("retry-after")
    return Response.json(
      { error: "Trop de requêtes, réessayez dans quelques minutes" },
      { status: 429, headers: retryAfter ? { "Retry-After": retryAfter } : undefined },
    )
  }

  if (status === 422) {
    return Response.json(
      { error: "Site non compatible", code: "UNSUPPORTED_MERCHANT" },
      { status: 422 },
    )
  }

  console.error(`[${route}] API call failed (status ${status ?? "none"}): ${(e as Error).message}`)
  return Response.json({ error }, { status: 500 })
}
