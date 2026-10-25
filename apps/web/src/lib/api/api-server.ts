import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"

const baseUrl = process.env.API_URL as string

/**
 * This client is shared by every visitor, so it only carries the credentials of
 * the Next.js server. The visitor IP is added per request with
 * `clientIpHeaders()`, since Tuyau forwards the `headers` option to ky.
 *
 * The API never redirects, so a redirect is refused rather than followed with
 * the API key to another host. Retrying a 429 would only burn the visitor's
 * quota, so retries are off.
 */
export const apiClient = createTuyau({
  baseUrl,
  registry,
  headers: {
    Accept: "application/json",
    "X-Api-Key": process.env.API_KEY,
  },
  redirect: "error",
  retry: 0,
})
