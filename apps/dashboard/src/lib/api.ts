import { QueryClient } from "@tanstack/react-query"
import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"
import { createTuyauReactQueryClient } from "@tuyau/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export const client = createTuyau({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3333",
  registry,
  credentials: "include",
  headers: { Accept: "application/json" },
})

/**
 * Type-safe TanStack Query client generated from Tuyau registry.
 * Use this for all queries and mutations to get end-to-end type safety
 * and automatic query key management.
 */
export const api = createTuyauReactQueryClient({ client })
