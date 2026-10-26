import { isIP } from "node:net"
import { defineConfig, type HttpRequest } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"
import proxyaddr from "proxy-addr"

import { isCloudflareEdge } from "#lib/cloudflare"

/**
 * `peer` is the first untrusted address, i.e. whoever reached Traefik. When it
 * is a Cloudflare edge, the visitor is the address Cloudflare reports in
 * CF-Connecting-IP; a request from a Cloudflare Worker gets the Worker address
 * there, never one chosen by the Worker. Any other peer reached the origin
 * directly, so its own address is used and a CF-Connecting-IP it sent is ignored.
 */
function resolveVisitorIp(request: HttpRequest, peer: string) {
  if (!isCloudflareEdge(peer)) return peer

  const connectingIp = request.header("cf-connecting-ip")?.trim()
  return connectingIp && isIP(connectingIp) ? connectingIp : peer
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
   * Traefik and the Next.js server reach the API over the Docker network, so
   * private addresses are trusted to forward X-Forwarded-For. Next.js forwards
   * the headers it received, which makes its calls resolve like direct ones.
   */
  trustProxy: proxyaddr.compile(["loopback", "uniquelocal"]),

  /**
   * Rate limits are keyed on `request.ip()`, so a visitor behind a Cloudflare
   * edge is keyed on CF-Connecting-IP.
   */
  getIp(request, originalFn) {
    return resolveVisitorIp(request, originalFn())
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
