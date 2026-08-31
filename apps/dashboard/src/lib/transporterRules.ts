import { client } from "./api"

export const MAX_FEE_RULES = 200

export interface FlowNodePayload {
  nodeID: string
  nodeType: "start" | "condition" | "fee"
  positionX: number
  positionY: number
  nodeData: Record<string, unknown>
}

export interface FlowEdgePayload {
  edgeID: string
  sourceNodeID: string
  targetNodeID: string
  sourceHandle: "yes" | "no" | "default" | null
  edgeLabel: string | null
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object") {
    const maybeBody = (error as { body?: unknown }).body
    if (maybeBody && typeof maybeBody === "object") {
      const message = (maybeBody as { message?: unknown }).message
      if (typeof message === "string" && message.length > 0) return message
    }
    const message = (error as { message?: unknown }).message
    if (typeof message === "string" && message.length > 0 && message !== "Failed to fetch") {
      return message
    }
  }
  return fallback
}

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
