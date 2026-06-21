import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router"
import type { TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import { Suspense } from "react"
import { FlowEditorSkeleton } from "@/components/Dashboard/Transporters/RulesFlow/Skeletons"
import RulesFlowEditor from "@/components/Dashboard/Transporters/RulesFlow/RulesFlowEditor"
import { api, client } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/transporters/editor/$id")({
  pendingComponent: FlowEditorSkeleton,
  pendingMs: 0,
  loader: async ({ context, params }) => {
    const { id } = params

    const [transporter, flowData] = await Promise.all([
      context.queryClient
        .ensureQueryData(api.transporters.show.queryOptions({ params: { id } }))
        .catch(() => null) as Promise<Record<string, string> | null>,
      context.queryClient.ensureQueryData<{
        nodes: TransporterFlowNode[]
        edges: TransporterFlowEdge[]
      }>({
        queryKey: api.transporterRules.show.queryKey({ params: { transporterId: id } }),
        queryFn: async () => {
          try {
            const result = (await client.api.transporterRules.show({
              params: { transporterId: id },
            })) as Record<string, unknown>
            return {
              nodes: (result.flowNodes ?? []) as TransporterFlowNode[],
              edges: (result.flowEdges ?? []) as TransporterFlowEdge[],
            }
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
    <Suspense fallback={<FlowEditorSkeleton />}>
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
