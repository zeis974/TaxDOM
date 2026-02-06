"use client"

import { saveTransporterRules } from "@/actions/transporters/saveTransporterRules"
import type { TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type ColorMode,
  type Edge,
  type Node,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useRouter } from "next/navigation"
import {
  Component,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
  type DragEvent,
  type ErrorInfo,
  type ReactNode,
} from "react"
import { toast } from "sonner"
import { flowToRules, useRulesFlow, validateFlow } from "./hooks"
import { ConditionNode, FeeNode, StartNode } from "./nodes"
import { RightSidePanel } from "./panels"
import {
  FlowCanvas,
  PageBackButton,
  PageBody,
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PublishButton,
} from "./RulesFlowEditor.styled"

const nodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  fee: FeeNode,
}

class FlowErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Flow editor error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
          <h3 style={{ marginBottom: "8px" }}>Le constructeur de flux a rencontré une erreur</h3>
          <p>Veuillez recharger la page ou contacter le support.</p>
        </div>
      )
    }
    return this.props.children
  }
}

interface RulesFlowEditorProps {
  transporterID: string
  transporterName: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
}

function RulesFlowEditorInner({
  transporterID,
  transporterName,
  initialNodes = [],
  initialEdges = [],
}: RulesFlowEditorProps) {
  const router = useRouter()
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()

  const colorMode: ColorMode = useSyncExternalStore(
    () => () => {},
    () => "system",
    () => "light",
  )

  const handleSaveRules = useCallback(
    async (nodes: Node[], edges: Edge[]) => {
      const validation = validateFlow(nodes, edges)

      if (!validation.isValid) {
        toast.error("Erreurs de validation", {
          description: validation.errors.map((e) => e.message).join("; "),
        })
        return
      }

      if (validation.warnings.length > 0) {
        console.warn("Flow warnings:", validation.warnings)
      }

      const dbNodes = nodes.map((node) => ({
        nodeID: node.id,
        nodeType: node.type || "start",
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
        nodeData: node.data,
      }))

      const dbEdges = edges.map((edge) => ({
        edgeID: edge.id,
        sourceNodeID: edge.source,
        targetNodeID: edge.target,
        sourceHandle: edge.sourceHandle ?? null,
        edgeLabel: typeof edge.label === "string" ? edge.label : null,
      }))

      const rules = flowToRules(nodes, edges, transporterID)
      const dbRules = rules.map((rule) => ({
        ...rule,
        fee: rule.fee,
      }))

      const result = await saveTransporterRules({
        transporterID,
        nodes: dbNodes,
        edges: dbEdges,
        rules: dbRules,
      })

      if (!result.success) {
        toast.error(`Erreur lors de la sauvegarde: ${result.error}`)
      }
    },
    [transporterID],
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
      if ((node.data as Record<string, unknown>).isOrphaned === isOrphaned) {
        return node
      }
      return {
        ...node,
        data: {
          ...node.data,
          isOrphaned,
        },
      }
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
      const dataStr = event.dataTransfer.getData("application/reactflow/data")

      if (!type) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const data: Record<string, unknown> = dataStr
        ? (() => {
            try {
              return JSON.parse(dataStr)
            } catch {
              return {}
            }
          })()
        : {}
      if (type === "condition" || type === "fee") {
        addNodeAtPosition(type, position, data)
      }
    },
    [screenToFlowPosition, addNodeAtPosition],
  )

  const handleBack = useCallback(() => {
    if (isDirty) {
      const confirmed = confirm(
        "Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?",
      )
      if (!confirmed) return
    }
    router.push("/dashboard/transporters")
  }, [router, isDirty])

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderLeft>
          <PageBackButton type="button" onClick={handleBack} aria-label="Retour">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </PageBackButton>
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
        <FlowCanvas ref={reactFlowWrapper}>
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
            defaultEdgeOptions={{ animated: false }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} color="#e5e7eb" gap={18} size={1} />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "start":
                    return "#22c55e"
                  case "condition":
                    return "#3b82f6"
                  case "fee":
                    return "#f97316"
                  default:
                    return "#9ca3af"
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
              style={{ borderRadius: "8px" }}
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
    <FlowErrorBoundary>
      <ReactFlowProvider>
        <RulesFlowEditorInner {...props} />
      </ReactFlowProvider>
    </FlowErrorBoundary>
  )
}
