import { useQueryClient } from "@tanstack/react-query"
import type { TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import {
  Background,
  BackgroundVariant,
  type ColorMode,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react"
import { api } from "@/lib/api"
import {
  apiErrorMessage,
  type FlowEdgePayload,
  type FlowNodePayload,
  saveTransporterRules,
} from "@/lib/transporterRules"
import { token } from "@/panda/tokens"
import "@xyflow/react/dist/style.css"
import { type DragEvent, useCallback, useMemo, useRef } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"
import { flowToRules, MAX_FEE_RULES, useRulesFlow, validateFlow } from "./hooks"
import { ConditionNode, FeeNode, StartNode } from "./nodes"
import { RightSidePanel } from "./panels"
import {
  FlowCanvas,
  FlowErrorState,
  PageBackButton,
  PageBody,
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PublishButton,
} from "./RulesFlow.styled"

const nodeTypes: NodeTypes = { start: StartNode, condition: ConditionNode, fee: FeeNode }

const miniMapColors: Record<string, string> = {
  start: token.var("colors.accentGreen"),
  condition: token.var("colors.accentPink"),
  fee: token.var("colors.accentOrange"),
}

function FlowErrorFallback() {
  return (
    <FlowErrorState>
      <h3>Le constructeur de flux a rencontré une erreur</h3>
      <p>Veuillez recharger la page.</p>
    </FlowErrorState>
  )
}

interface RulesFlowEditorProps {
  transporterID: string
  transporterName: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
  onBack?: () => void
}

function RulesFlowEditorInner({
  transporterID,
  transporterName,
  initialNodes = [],
  initialEdges = [],
  onBack,
}: RulesFlowEditorProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const queryClient = useQueryClient()

  // The resolved theme is stamped on <html> by the boot script in index.html
  // and never changes at runtime, so "system" would ignore an explicit choice.
  const colorMode: ColorMode = document.documentElement.dataset.theme === "dark" ? "dark" : "light"

  const handleSaveRules = useCallback(
    async (nodes: Node[], edges: Edge[]) => {
      const validation = validateFlow(nodes, edges)
      if (!validation.isValid) {
        toast.error("Erreurs de validation", {
          description: validation.errors.map((e) => e.message).join(" · "),
        })
        return false
      }
      if (validation.warnings.length > 0) {
        toast.warning("Avertissements", { description: validation.warnings.join(" · ") })
      }

      const rules = flowToRules(nodes, edges, transporterID)
      if (rules.length === 0) {
        toast.error("Aucune règle générée", {
          description: "Aucun nœud de frais n'est atteignable depuis le nœud de départ",
        })
        return false
      }
      if (rules.length >= MAX_FEE_RULES) {
        toast.error("Flow trop complexe", {
          description: `Le flow génère au moins ${MAX_FEE_RULES} règles, le maximum accepté`,
        })
        return false
      }

      const dbNodes: FlowNodePayload[] = nodes.map((node) => ({
        nodeID: node.id,
        nodeType: (node.type as FlowNodePayload["nodeType"]) || "start",
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
        nodeData: node.data,
      }))
      const dbEdges: FlowEdgePayload[] = edges.map((edge) => ({
        edgeID: edge.id,
        sourceNodeID: edge.source,
        targetNodeID: edge.target,
        sourceHandle: (edge.sourceHandle as FlowEdgePayload["sourceHandle"]) ?? null,
        edgeLabel: typeof edge.label === "string" ? edge.label : null,
      }))

      try {
        await saveTransporterRules({ transporterID, nodes: dbNodes, edges: dbEdges, rules })
        // The API re-keys every node, so the cached flow is stale the moment
        // the save lands.
        await queryClient.invalidateQueries({
          queryKey: api.transporterRules.show.queryKey({
            params: { transporterId: transporterID },
          }),
        })
        toast.success("Règles sauvegardées avec succès")
        return true
      } catch (error) {
        toast.error("Erreur lors de la sauvegarde", {
          description: apiErrorMessage(error, "Réessayez dans un instant"),
        })
        return false
      }
    },
    [transporterID, queryClient],
  )

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    selectedNode,
    setSelectedNode,
    addNodeAtPosition,
    updateNode,
    deleteNode,
    handleSave,
    isDirty,
    flowStats,
  } = useRulesFlow({
    transporterID,
    transporterName,
    initialNodes,
    initialEdges,
    onSave: handleSaveRules,
  })

  const nodesWithOrphanStatus = useMemo(() => {
    return nodes.map((node) => {
      const isOrphaned = flowStats.orphanedNodeIds.has(node.id)
      if ((node.data as Record<string, unknown>).isOrphaned === isOrphaned) return node
      return { ...node, data: { ...node.data, isOrphaned } }
    })
  }, [nodes, flowStats.orphanedNodeIds])

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      const type = event.dataTransfer.getData("application/reactflow/type")
      if (!type) return
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
      if (type === "condition" || type === "fee") addNodeAtPosition(type, position, {})
    },
    [screenToFlowPosition, addNodeAtPosition],
  )

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderLeft>
          {onBack && (
            <PageBackButton type="button" onClick={onBack} aria-label="Retour">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </PageBackButton>
          )}
        </PageHeaderLeft>
        <PageHeaderRight>
          <PublishButton type="button" onClick={handleSave} disabled={!isDirty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Sauvegarder
          </PublishButton>
        </PageHeaderRight>
      </PageHeader>
      <PageBody>
        <FlowCanvas ref={reactFlowWrapper as React.RefObject<HTMLDivElement>}>
          <ReactFlow
            nodes={nodesWithOrphanStatus}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            colorMode={colorMode}
            fitView
            fitViewOptions={{ padding: 0.3 }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              color={token.var("colors.border")}
              gap={18}
              size={1}
            />
            <Controls />
            <MiniMap
              nodeColor={(node) => miniMapColors[node.type ?? ""] ?? token.var("colors.textMuted")}
              maskColor={token.var("colors.shadow")}
              style={{ borderRadius: token("radii.md") }}
            />
          </ReactFlow>
        </FlowCanvas>
        <RightSidePanel
          selectedNode={selectedNode}
          onUpdateNode={updateNode}
          onDeleteNode={deleteNode}
          onCloseInspector={() => setSelectedNode(null)}
        />
      </PageBody>
    </PageContainer>
  )
}

export default function RulesFlowEditor(props: RulesFlowEditorProps) {
  return (
    <ErrorBoundary FallbackComponent={FlowErrorFallback}>
      <ReactFlowProvider>
        <RulesFlowEditorInner {...props} />
      </ReactFlowProvider>
    </ErrorBoundary>
  )
}
