"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const transporterIdSchema = z.uuidv7("ID du transporteur invalide")

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
  const parsed = transporterIdSchema.safeParse(input.transporterID)
  if (!parsed.success) {
    return {
      success: false,
      error: "ID du transporteur invalide",
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/transporters/${parsed.data}/rules`, {
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
    })

    if (!res.ok) {
      return {
        success: false,
        error: "Erreur lors de la sauvegarde des règles",
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
