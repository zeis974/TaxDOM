import { registry } from "@taxdom/api/registry"
import { createTuyau } from "@tuyau/core/client"

const baseUrl = process.env.API_URL as string

export const apiClient = createTuyau({
  baseUrl,
  registry,
  headers: {
    Accept: "application/json",
    "X-Api-Key": process.env.API_KEY,
  },
})
