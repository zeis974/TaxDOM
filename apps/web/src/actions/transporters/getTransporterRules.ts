"use server"

import type { TransporterFeeRule, TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import { cookies } from "next/headers"
import { z } from "zod"

const transporterIdSchema = z.uuidv7("ID du transporteur invalide")

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

    const data = await res.json()
    return {
      success: true,
      data,
    }
  } catch {
    return {
      success: false,
      error: "Erreur de connexion au serveur",
    }
  }
}
