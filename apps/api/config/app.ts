import { timingSafeEqual } from "node:crypto"
import { isIP } from "node:net"
import { defineConfig, type HttpRequest } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"
import proxyaddr from "proxy-addr"

import env from "#start/env"

/**
 * Compiles TRUSTED_PROXIES (comma-separated IPs, CIDR ranges or proxy-addr
 * presets such as `loopback` and `uniquelocal`) for `http.trustProxy`. An
 * invalid entry makes proxy-addr throw, so a typo aborts the boot instead of
 * silently trusting nothing and keying every rate limit on the proxy address.
 */
function compileTrustedProxies(value: string) {
  const entries = value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)

  return proxyaddr.compile(entries)
}

const CLIENT_IP_HEADER = "x-taxdom-client-ip"
const PROXY_SECRET_HEADER = "x-taxdom-proxy-secret"

/**
 * Returns the visitor IP forwarded by the Next.js server, or undefined when the
 * header must be ignored. The API is reachable directly from the browser, so a
 * forwarded IP only counts when it carries the secret shared with Next.
 *
 * The secret is read on every request rather than once at boot, so tests can
 * exercise both the configured and the unconfigured cases.
 */
function resolveForwardedIp(request: HttpRequest) {
  const expectedSecret = process.env.PROXY_SHARED_SECRET
  const receivedSecret = request.header(PROXY_SECRET_HEADER)
  if (!expectedSecret || !receivedSecret) return undefined

  const expected = Buffer.from(expectedSecret)
  const received = Buffer.from(receivedSecret)
  // Length is not a secret, so it can be compared first; timingSafeEqual then
  // needs equal-length buffers and keeps the content comparison constant-time.
  if (expected.length !== received.length) return undefined
  if (!timingSafeEqual(expected, received)) return undefined

  const forwardedIp = request.header(CLIENT_IP_HEADER)?.trim()
  return forwardedIp && isIP(forwardedIp) ? forwardedIp : undefined
}

/**
 * The configuration settings used by the HTTP server
 */
export const http = defineConfig({
  /**
   * Generate a unique request id for each incoming request.
   * Useful to correlate logs and debug a request flow.
   */
  generateRequestId: true,

  /**
   * Allow HTTP method spoofing via the "_method" form/query parameter.
   * This lets HTML forms target PUT/PATCH/DELETE routes while still
   * submitting with POST.
   */
  allowMethodSpoofing: false,

  /**
   * Enabling async local storage will let you access HTTP context
   * from anywhere inside your application.
   */
  useAsyncLocalStorage: false,

  /**
   * Addresses whose X-Forwarded-For is trusted when resolving the visitor IP.
   * `loopback` keeps the AdonisJS default; add the ingress or the Next.js
   * server address once the production topology is known.
   */
  trustProxy: compileTrustedProxies(env.get("TRUSTED_PROXIES") || "loopback"),

  /**
   * Rate limits are keyed on `request.ip()`, so the visitor IP forwarded by the
   * Next.js server takes precedence over the socket address of the caller.
   */
  getIp(request, originalFn) {
    return resolveForwardedIp(request) ?? originalFn()
  },

  /**
   * Manage cookies configuration. The settings for the session id cookie are
   * defined inside the "config/session.ts" file.
   */
  cookie: {
    /**
     * Restrict the cookie to a specific domain.
     * Keep empty to use the current host.
     */
    domain: "",

    /**
     * Restrict the cookie to a URL path. '/' means all routes.
     */
    path: "/",

    /**
     * Default lifetime for cookies managed by the HTTP layer.
     */
    maxAge: "2h",

    /**
     * Prevent JavaScript access to the cookie in the browser.
     */
    httpOnly: true,

    /**
     * Send cookies only over HTTPS in production.
     */
    secure: app.inProduction,

    /**
     * Cross-site policy for cookie sending.
     */
    sameSite: "lax",
  },
})
