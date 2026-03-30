import { defineConfig } from "@adonisjs/shield"

const shieldConfig = defineConfig({
  /**
   * CSRF — Disabled for API. CSRF protection is designed for
   * server-rendered forms. This API uses Bearer tokens + session
   * cookies with SameSite/secure attributes instead.
   */
  csrf: {
    enabled: false,
  },

  /**
   * CSP — Restrictive policy for API responses.
   * API serves JSON, not HTML, so we block everything by default.
   */
  csp: {
    enabled: true,
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'none'"],
    },
  },

  /**
   * HSTS — Force HTTPS in production.
   */
  hsts: {
    enabled: true,
    maxAge: "180 days",
    includeSubDomains: true,
  },

  /**
   * X-Frame-Options — Prevent clickjacking.
   */
  xFrame: {
    enabled: true,
    action: "DENY",
  },

  /**
   * Content-Type sniffing — Disable to prevent MIME confusion attacks.
   */
  contentTypeSniffing: {
    enabled: true,
  },
})

export default shieldConfig
