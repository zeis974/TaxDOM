import { fetchAPI } from "./api"

export async function saveTransporterRules(data: {
  transporterID: string
  nodes: unknown[]
  edges: unknown[]
  rules: unknown[]
}) {
  return fetchAPI(`/v1/admin/transporters/${data.transporterID}/rules`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}
