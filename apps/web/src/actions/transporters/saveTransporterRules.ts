"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

type FlowNode = {
  nodeID: string
  nodeType: string
  positionX: number
  positionY: number
  nodeData: Record<string, unknown>
}

type FlowEdge = {
  edgeID: string
  sourceNodeID: string
  targetNodeID: string
  sourceHandle?: string | null
  edgeLabel?: string | null
}

type FeeRule = {
  ruleID?: string
  minAmount: number | null
  maxAmount: number | null
  isIndividual: boolean | null
  originIsEU: boolean | null
  fee: string
  priority: number
}

export type SaveTransporterRulesInput = {
  transporterID: string
  nodes: FlowNode[]
  edges: FlowEdge[]
  rules: FeeRule[]
}

export async function saveTransporterRules(
  input: SaveTransporterRulesInput,
): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies()
    const res = await fetch(
      `${process.env.API_URL}/dashboard/transporters/${input.transporterID}/rules`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({
          nodes: input.nodes,
          edges: input.edges,
          rules: input.rules,
        }),
      },
    )

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || "Erreur lors de la sauvegarde des règles",
      }
    }

    revalidateTag("transporters", "rules")
    return { success: true }
  } catch {
    return {
      success: false,
      error: "Erreur de connexion au serveur",
    }
  }
}
