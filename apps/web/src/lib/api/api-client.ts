import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"
import { createTuyauReactQueryClient } from "@tuyau/react-query"

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string

export const apiClient = createTuyau({
  baseUrl,
  registry,
  headers: {
    Accept: "application/json",
  },
})

export const api = createTuyauReactQueryClient({ client: apiClient })
