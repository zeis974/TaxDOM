"use server"

import { cookies } from "next/headers"
import type { TransporterFlowNode, TransporterFlowEdge, TransporterFeeRule } from "@taxdom/types"

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
  try {
    const cookieStore = await cookies()
    const res = await fetch(
      `${process.env.API_URL}/dashboard/transporters/${transporterID}/rules`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      },
    )

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || "Erreur lors de la récupération des règles",
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
