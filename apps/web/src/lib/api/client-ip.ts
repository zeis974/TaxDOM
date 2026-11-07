const FORWARDED_HEADERS = ["x-forwarded-for", "cf-connecting-ip"]

/**
 * Headers telling the API which visitor a server-side call belongs to, so rate
 * limits are per visitor instead of per Next.js server. The API trusts the
 * Next.js server as a proxy and resolves these exactly like a direct call.
 */
export function clientIpHeaders(requestHeaders: Headers) {
  const headers: Record<string, string> = {}
  for (const name of FORWARDED_HEADERS) {
    const value = requestHeaders.get(name)
    if (value) headers[name] = value
  }
  return headers
}
