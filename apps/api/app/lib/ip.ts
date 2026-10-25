import { isIP } from "node:net"
import { normalizeIP } from "@better-auth/core/utils/ip"

/**
 * Rate limit key for a visitor IP, built like Better Auth's sign-in keys: IPv6
 * addresses are collapsed to their /64, since a visitor is usually handed a
 * whole one, and IPv4-mapped addresses are keyed as the IPv4 address they carry.
 */
export function rateLimitKey(ip: string) {
  // A zone id does not identify the visitor, and `normalizeIP` returns an
  // address carrying one unchanged, which would mint a new key per zone.
  const address = ip.split("%")[0]

  // `normalizeIP` also returns malformed input unchanged, so it must not reach it.
  if (!isIP(address)) return "invalid-ip"

  return normalizeIP(address, { ipv6Subnet: 64 })
}
