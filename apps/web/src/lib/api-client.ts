import { createTuyau } from "@tuyau/core/client"
import { createTuyauReactQueryClient } from "@tuyau/react-query"
import { registry } from "@taxdom/api/registry"

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3334"

export const apiClient = createTuyau({
  baseUrl,
  registry,
  headers: { Accept: "application/json" },
})

/**
 * Type-safe TanStack Query client generated from Tuyau registry.
 * Use this for all queries and mutations to get end-to-end type safety
 * and automatic query key management.
 */
export const api = createTuyauReactQueryClient({ client: apiClient })
