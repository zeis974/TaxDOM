import { createIsomorphicFn } from "@tanstack/react-start"
import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"
import { createTuyauReactQueryClient } from "@tuyau/react-query"

const getForwardedCookieHeader = createIsomorphicFn()
  .server(async () => {
    const { getRequestHeader } = await import("@tanstack/react-start/server")
    return getRequestHeader("cookie")
  })
  .client(() => undefined)

// Prefer the runtime process env (set on the deployed container, e.g. via Coolify) over
// the build-time inlined value, so the API URL can change without a rebuild. This module
// runs isomorphically, but `process.env.VITE_API_URL` is simply undefined in the browser.
const baseUrl =
  (typeof process !== "undefined" ? process.env.VITE_API_URL : undefined) ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3333"

export const client = createTuyau({
  baseUrl,
  registry,
  credentials: "include",
  headers: { Accept: "application/json" },
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookie = await getForwardedCookieHeader()
        if (cookie) {
          request.headers.set("cookie", cookie)
        }
      },
    ],
  },
})

/**
 * Type-safe TanStack Query client generated from Tuyau registry.
 * Use this for all queries and mutations to get end-to-end type safety
 * and automatic query key management.
 */
export const api = createTuyauReactQueryClient({ client })
