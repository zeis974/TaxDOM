"use client"

import { useCallback, useRef, useMemo, type DragEvent } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type ColorMode,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import type { TransporterFlowNode, TransporterFlowEdge } from "@taxdom/types"
import { StartNode, ConditionNode, FeeNode } from "./nodes"
import { RightSidePanel } from "./panels"
import { useRulesFlow, flowToRules, validateFlow } from "./hooks"
import { saveTransporterRules } from "@/actions/transporters/saveTransporterRules"
import {
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageBackButton,
  PageHeaderRight,
  HeaderButton,
  PublishButton,
  PageBody,
  FlowCanvas,
} from "./RulesFlowEditor.styled"

const nodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  fee: FeeNode,
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
  const { resolvedTheme } = useTheme()

  const colorMode: ColorMode = resolvedTheme === "dark" ? "dark" : "light"
  const minimapBgColor = resolvedTheme === "dark" ? "#1e293b" : "#ffffff"

  const handleSaveRules = useCallback(
    async (nodes: Node[], edges: Edge[]) => {
      // Valider le flow avant la sauvegarde
      const validation = validateFlow(nodes, edges)

      if (!validation.isValid) {
        const errorMessages = validation.errors.map((e) => e.message).join("\n")
        console.error("Flow validation failed:", errorMessages)
        alert(`Erreurs de validation:\n${errorMessages}`)
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
        nodeData: node.data as Record<string, unknown>,
      }))

      const dbEdges = edges.map((edge) => ({
        edgeID: edge.id,
        sourceNodeID: edge.source,
        targetNodeID: edge.target,
        sourceHandle: edge.sourceHandle || null,
        edgeLabel: (edge.label as string) || null,
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
        console.error("Error saving rules:", result.error)
        alert(`Erreur lors de la sauvegarde: ${result.error}`)
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

  // Enrichir les nodes avec l'info orphelin pour l'affichage visuel
  const nodesWithOrphanStatus = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isOrphaned: flowStats.orphanedNodeIds.has(node.id),
      },
    }))
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

      const data = dataStr ? JSON.parse(dataStr) : {}
      addNodeAtPosition(type as "condition" | "fee", position, data)
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
          <HeaderButton type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Tester
          </HeaderButton>
          <PublishButton type="button" onClick={handleSave} disabled={!isDirty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            {isDirty ? "Publier" : "Publié"}
          </PublishButton>
        </PageHeaderRight>
      </PageHeader>
      <PageBody>
        <FlowCanvas ref={reactFlowWrapper as unknown as React.RefObject<HTMLDivElement>}>
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
              bgColor={minimapBgColor}
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
    <ReactFlowProvider>
      <RulesFlowEditorInner {...props} />
    </ReactFlowProvider>
  )
}
