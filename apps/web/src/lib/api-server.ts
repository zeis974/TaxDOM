import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"

const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3334"

export const apiClient = createTuyau({
  baseUrl,
  registry,
  headers: {
    Accept: "application/json",
    "X-Api-Key": process.env.API_KEY
  },
})
