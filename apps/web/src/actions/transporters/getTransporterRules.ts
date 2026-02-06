"use server"

import type { TransporterFeeRule, TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import { cookies } from "next/headers"
import { z } from "zod"

const transporterIdSchema = z.uuidv7("ID du transporteur invalide")

const transporterRulesResponseSchema = z.object({
  transporterID: z.string(),
  transporterName: z.string(),
  flowNodes: z.array(
    z.object({
      nodeID: z.string(),
      transporterID: z.string(),
      nodeType: z.enum(["start", "condition", "fee"]),
      positionX: z.number(),
      positionY: z.number(),
      nodeData: z.record(z.unknown()),
    }),
  ),
  flowEdges: z.array(
    z.object({
      edgeID: z.string(),
      transporterID: z.string(),
      sourceNodeID: z.string(),
      targetNodeID: z.string(),
      sourceHandle: z.enum(["yes", "no", "default"]).nullable(),
      edgeLabel: z.string().nullable(),
    }),
  ),
  feeRules: z.array(
    z.object({
      ruleID: z.string(),
      transporterID: z.string(),
      minAmount: z.number().nullable(),
      maxAmount: z.number().nullable(),
      isIndividual: z.boolean().nullable(),
      originIsEU: z.boolean().nullable(),
      fee: z.string(),
      priority: z.number(),
    }),
  ),
})

export type TransporterRulesData = {
  transporterID: string
  transporterName: string
  flowNodes: TransporterFlowNode[]
  flowEdges: TransporterFlowEdge[]
  feeRules: TransporterFeeRule[]
}

export async function getTransporterRules(
  transporterID: string,
): Promise<{ success: boolean; data?: TransporterRulesData; error?: string }> {
  const parsed = transporterIdSchema.safeParse(transporterID)
  if (!parsed.success) {
    return {
      success: false,
      error: "ID du transporteur invalide",
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/transporters/${parsed.data}/rules`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    })

    if (!res.ok) {
      return {
        success: false,
        error: "Erreur lors de la récupération des règles",
      }
    }

    const raw = await res.json()
    const validated = transporterRulesResponseSchema.safeParse(raw)
    if (!validated.success) {
      return {
        success: false,
        error: "Données de réponse invalides",
      }
    }

    return {
      success: true,
      data: validated.data as TransporterRulesData,
    }
  } catch {
    return {
      success: false,
      error: "Erreur de connexion au serveur",
    }
  }
}
