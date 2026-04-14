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
import "@xyflow/react/dist/style.css"
import { type DragEvent, useCallback, useRef, useSyncExternalStore } from "react"
import Button from "@/components/ui/Button"
import { useRulesFlow } from "./hooks"
import { ConditionNode, FeeNode, StartNode } from "./nodes"
import { RightSidePanel } from "./panels"
import {
  FlowActions,
  FlowBody,
  FlowCanvas,
  FlowContainer,
  FlowHeader,
  FlowSubtitle,
  FlowTitle,
  FlowTitleWrap,
} from "./RulesFlow.styled"

const nodeTypes: NodeTypes = { start: StartNode, condition: ConditionNode, fee: FeeNode }

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
  const colorMode: ColorMode = useSyncExternalStore(
    () => () => {},
    () => "system",
    () => "light",
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
  } = useRulesFlow({ transporterID, transporterName, initialNodes, initialEdges, onSave })

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
      addNodeAtPosition(type as "condition" | "fee", position, {})
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
        <FlowCanvas ref={reactFlowWrapper as React.RefObject<HTMLDivElement>}>
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
        <RightSidePanel
          selectedNode={selectedNode}
          onUpdateNode={updateNode}
          onDeleteNode={deleteNode}
          onCloseInspector={() => setSelectedNode(null)}
        />
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
