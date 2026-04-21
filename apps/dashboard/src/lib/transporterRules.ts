import { client } from "./api"

export async function saveTransporterRules(data: {
  transporterID: string
  nodes: unknown[]
  edges: unknown[]
  rules: unknown[]
}) {
  return client.api.transporterRules.saveAll({
    params: { transporterId: data.transporterID },
    body: {
      nodes: data.nodes as {
        nodeID?: string | null
        nodeData?: unknown
        nodeType: "start" | "condition" | "fee"
        positionX: string | number
        positionY: string | number
      }[],
      edges: data.edges as {
        edgeID?: string | null
        sourceHandle?: "default" | "no" | "yes" | null
        edgeLabel?: string | null
        sourceNodeID: string
        targetNodeID: string
      }[],
      rules: data.rules as {
        ruleID?: string | null
        priority: string | number
        fee: string
        minAmount: string | number | null
        maxAmount: string | number | null
        isIndividual: string | number | boolean | null
        originIsEU: string | number | boolean | null
      }[],
    },
  })
}
