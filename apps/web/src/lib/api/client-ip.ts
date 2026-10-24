const CLIENT_IP_REQUEST_HEADER = "X-Taxdom-Client-IP"
const PROXY_SECRET_REQUEST_HEADER = "X-Taxdom-Proxy-Secret"

/**
 * Ingress header carrying the visitor IP: `cf-connecting-ip` behind Cloudflare,
 * `x-real-ip` behind nginx or traefik. Describes the deployment, so it is read
 * once per server process.
 */
const clientIpHeader = process.env.CLIENT_IP_HEADER?.trim().toLowerCase()

/**
 * Visitor IP as seen by the ingress, or undefined when it cannot be determined.
 */
export function resolveClientIp(requestHeaders: Headers): string | undefined {
  if (clientIpHeader) {
    return requestHeaders.get(clientIpHeader)?.trim() || undefined
  }

  const forwardedFor = requestHeaders.get("x-forwarded-for")
  if (!forwardedFor) return undefined

  // The rightmost entry is the one appended by our own ingress. The leftmost is
  // supplied by the browser, which makes it forgeable.
  return forwardedFor.split(",").at(-1)?.trim() || undefined
}

/**
 * Headers telling the API which visitor a server-side call belongs to, so rate
 * limits are per visitor instead of per Next.js server. The secret is
 * server-only: never expose it through a NEXT_PUBLIC_ variable.
 */
export function clientIpHeaders(requestHeaders: Headers): Record<string, string> {
  const secret = process.env.PROXY_SHARED_SECRET
  const clientIp = resolveClientIp(requestHeaders)
  if (!secret || !clientIp) return {}

  return {
    [CLIENT_IP_REQUEST_HEADER]: clientIp,
    [PROXY_SECRET_REQUEST_HEADER]: secret,
  }
}
