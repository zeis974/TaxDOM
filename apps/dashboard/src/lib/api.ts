import { QueryClient } from "@tanstack/react-query"
import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"

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
