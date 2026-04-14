import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router"
import type { TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import { Suspense } from "react"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import RulesFlowEditor from "@/components/Dashboard/Transporters/RulesFlow/RulesFlowEditor"
import { fetchAPI } from "@/lib/api"

interface Transporter {
  transporterID: string
  transporterName: string
}

export const Route = createFileRoute("/_dashboard-layout/transporters/editor/$id")({
  loader: async ({ context, params }) => {
    const { id } = params

    const [transporter, flowData] = await Promise.all([
      context.queryClient
        .ensureQueryData<Transporter>({
          queryKey: ["transporter", id],
          queryFn: () => fetchAPI(`/v1/admin/transporters/${id}`),
        })
        .catch(() => null),
      context.queryClient.ensureQueryData<{
        nodes: TransporterFlowNode[]
        edges: TransporterFlowEdge[]
      }>({
        queryKey: ["transporter-flow", id],
        queryFn: async () => {
          try {
            return await fetchAPI<{ nodes: TransporterFlowNode[]; edges: TransporterFlowEdge[] }>(
              `/v1/admin/transporters/${id}/flow`,
            )
          } catch {
            return { nodes: [] as TransporterFlowNode[], edges: [] as TransporterFlowEdge[] }
          }
        },
      }),
    ])

    if (!transporter) {
      throw notFound()
    }

    return { transporter, flowData }
  },
  component: TransporterEditorPage,
})

function TransporterEditorPage() {
  const { id } = Route.useParams()
  const { transporter, flowData } = Route.useLoaderData()
  const navigate = useNavigate()

  return (
    <Suspense fallback={<LoadingFallback message="Chargement de l'éditeur..." />}>
      <RulesFlowEditor
        transporterID={id}
        transporterName={transporter.transporterName}
        initialNodes={flowData.nodes}
        initialEdges={flowData.edges}
        onBack={() => navigate({ to: "/transporters" })}
      />
    </Suspense>
  )
}
