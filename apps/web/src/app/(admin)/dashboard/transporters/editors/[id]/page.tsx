import type { Metadata } from "next"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import type { TransporterFlowNode, TransporterFlowEdge, TransporterFeeRule } from "@taxdom/types"
import RulesFlowEditor from "@/components/Dashboard/Transporters/RulesFlow/RulesFlowEditor"

type TransporterRulesData = {
  transporterID: string
  transporterName: string
  flowNodes: TransporterFlowNode[]
  flowEdges: TransporterFlowEdge[]
  feeRules: TransporterFeeRule[]
}

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Éditeur de règles | ${id}`,
    description: "Configurez les règles de frais pour ce transporteur",
  }
}

async function getTransporterRules(
  transporterID: string,
  cookie: string,
): Promise<TransporterRulesData | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/dashboard/transporters/${transporterID}/rules`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        cache: "no-store",
      },
    )

    if (!response.ok) {
      console.error("Failed to fetch transporter rules:", response.status, response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching transporter rules:", error)
    return null
  }
}

export default async function TransporterEditorPage({ params }: { params: Params }) {
  const { id } = await params
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const data = await getTransporterRules(id, cookie)

  if (!data) {
    notFound()
  }

  return (
    <RulesFlowEditor
      transporterID={data.transporterID}
      transporterName={data.transporterName}
      initialNodes={data.flowNodes}
      initialEdges={data.flowEdges}
    />
  )
}
