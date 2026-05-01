import { client } from "./api"

export async function saveTransporterRules(data: {
  transporterID: string
  nodes: unknown[]
  edges: unknown[]
  rules: unknown[]
}) {
  return client.post("/v1/admin/transporters/:transporterId/rules", {
    params: { transporterId: data.transporterID },
    body: {
      nodes: data.nodes,
      edges: data.edges,
      rules: data.rules,
    },
  } as any)
}
