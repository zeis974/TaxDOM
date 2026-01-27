"use client"

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
  type NodeTypes,
} from "@xyflow/react"
import { useTheme } from "next-themes"
import { useCallback, useRef, type DragEvent } from "react"

import { useRulesFlow } from "./hooks"
import { ConditionNode, FeeNode, StartNode } from "./nodes"
import { DragNodesSidebar, NodeEditor } from "./panels"

import Button from "@/components/ui/Button"

import {
  FlowActions,
  FlowBody,
  FlowCanvas,
  FlowContainer,
  FlowHeader,
  FlowInspector,
  FlowSubtitle,
  FlowTitle,
  FlowTitleWrap,
  InspectorEmpty,
  SidebarTitle,
} from "./RulesFlow.styled"

// Définir nodeTypes en dehors du composant pour éviter les re-renders
const nodeTypes: NodeTypes = {
  start: StartNode,
  condition: ConditionNode,
  fee: FeeNode,
}

interface RulesFlowProps {
  transporterID: string
  transporterName: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
  onSave?: (nodes: Node[], edges: Edge[]) => Promise<void>
}

function RulesFlowInner({
  transporterID,
  transporterName,
  initialNodes = [],
  initialEdges = [],
  onSave,
}: RulesFlowProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const { resolvedTheme } = useTheme()

  const colorMode: ColorMode = resolvedTheme === "dark" ? "dark" : "light"

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
  } = useRulesFlow({
    transporterID,
    transporterName,
    initialNodes,
    initialEdges,
    onSave,
  })

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

  return (
    <FlowContainer>
      <FlowHeader>
        <FlowTitleWrap>
          <FlowTitle>Règles de frais{isDirty ? " • Non sauvegardé" : ""}</FlowTitle>
          <FlowSubtitle>{transporterName}</FlowSubtitle>
        </FlowTitleWrap>

        <FlowActions>
          <Button type="button" variant="primary" onClick={handleSave} disabled={!isDirty}>
            Sauvegarder
          </Button>
        </FlowActions>
      </FlowHeader>
      <FlowBody>
        <DragNodesSidebar />
        <FlowCanvas ref={reactFlowWrapper as unknown as React.RefObject<HTMLDivElement>}>
          <ReactFlow
            nodes={nodes}
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
          >
            <Background variant={BackgroundVariant.Dots} gap={18} size={10} />
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

        <FlowInspector>
          {!selectedNode ? (
            <>
              <SidebarTitle>Inspector</SidebarTitle>
              <InspectorEmpty>
                Sélectionnez un nœud dans le canvas pour afficher ses paramètres.
              </InspectorEmpty>
            </>
          ) : (
            <NodeEditor
              node={selectedNode}
              onUpdate={updateNode}
              onDelete={deleteNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </FlowInspector>
      </FlowBody>
    </FlowContainer>
  )
}

export default function RulesFlow(props: RulesFlowProps) {
  return (
    <ReactFlowProvider>
      <RulesFlowInner {...props} />
    </ReactFlowProvider>
  )
}
