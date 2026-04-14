import type { TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import {
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { useCallback, useMemo, useRef, useState } from "react"
import { getDefaultFlow } from "../defaultFlows"

type FlowPosition = { x: number; y: number }
type NodeType = "condition" | "fee"

export function dbNodesToFlowNodes(dbNodes: TransporterFlowNode[]): Node[] {
  return dbNodes.map((node) => ({
    id: node.nodeID,
    type: node.nodeType,
    position: { x: node.positionX, y: node.positionY },
    data: node.nodeData,
  }))
}

export function dbEdgesToFlowEdges(dbEdges: TransporterFlowEdge[]): Edge[] {
  return dbEdges.map((edge) => ({
    id: edge.edgeID,
    source: edge.sourceNodeID,
    target: edge.targetNodeID,
    sourceHandle: edge.sourceHandle || undefined,
    label: edge.edgeLabel || undefined,
    animated: true,
  }))
}

interface UseRulesFlowOptions {
  transporterID: string
  transporterName?: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
  onSave?: (nodes: Node[], edges: Edge[]) => Promise<void>
}

export function useRulesFlow({
  transporterID,
  transporterName = "",
  initialNodes = [],
  initialEdges = [],
  onSave,
}: UseRulesFlowOptions) {
  const nodeIdCounterRef = useRef(0)
  const defaultFlow = useMemo(() => getDefaultFlow(transporterName), [transporterName])

  const generateNodeId = useCallback((type: NodeType): string => {
    nodeIdCounterRef.current += 1
    return `${type}-${Date.now()}-${nodeIdCounterRef.current}-${Math.random().toString(36).substring(2, 9)}`
  }, [])

  const startNodes = useMemo(
    () => (initialNodes.length > 0 ? dbNodesToFlowNodes(initialNodes) : defaultFlow.nodes),
    [initialNodes, defaultFlow.nodes],
  )
  const startEdges = useMemo(
    () => (initialEdges.length > 0 ? dbEdgesToFlowEdges(initialEdges) : defaultFlow.edges),
    [initialEdges, defaultFlow.edges],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(startNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(startEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const orphanedNodeIds = useMemo(() => {
    const edgeTargets = new Set(edges.map((e) => e.target))
    const ids = new Set<string>()
    for (const node of nodes) {
      if (node.type === "start") continue
      if (!edgeTargets.has(node.id)) ids.add(node.id)
    }
    return ids
  }, [nodes, edges])

  const flowStats = useMemo(() => {
    const conditionNodes = nodes.filter((n) => n.type === "condition")
    const feeNodes = nodes.filter((n) => n.type === "fee")
    return {
      totalNodes: nodes.length,
      conditionCount: conditionNodes.length,
      feeCount: feeNodes.length,
      orphanedCount: orphanedNodeIds.size,
      hasOrphanedNodes: orphanedNodeIds.size > 0,
      orphanedNodeIds,
    }
  }, [nodes, orphanedNodeIds])

  const onConnect = useCallback(
    (connection: Connection) => {
      const existingEdge = edges.find(
        (e) =>
          e.source === connection.source &&
          e.target === connection.target &&
          e.sourceHandle === connection.sourceHandle,
      )
      if (existingEdge) return
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
      setIsDirty(true)
    },
    [setEdges, edges],
  )

  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes)
      const hasRealChange = changes.some(
        (c) => c.type === "position" || c.type === "remove" || c.type === "add",
      )
      if (hasRealChange) setIsDirty(true)
    },
    [onNodesChange],
  )

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes)
      const hasRealChange = changes.some(
        (c) => c.type === "add" || c.type === "remove" || c.type === "replace",
      )
      if (hasRealChange) setIsDirty(true)
    },
    [onEdgesChange],
  )

  const addNodeAtPosition = useCallback(
    (type: NodeType, position: FlowPosition, data?: Record<string, unknown>) => {
      const newId = generateNodeId(type)
      const newNode: Node = { id: newId, type, position, data: data || {} }
      setNodes((nds) => [...nds, newNode])
      setIsDirty(true)
      return newId
    },
    [setNodes, generateNodeId],
  )

  const updateNode = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      let found = false
      setNodes((nds) => {
        const nodeExists = nds.some((n) => n.id === nodeId)
        if (!nodeExists) return nds
        found = true
        return nds.map((node) => (node.id === nodeId ? { ...node, data } : node))
      })
      if (!found) return false
      setIsDirty(true)
      return true
    },
    [setNodes],
  )

  const deleteNode = useCallback(
    (nodeId: string) => {
      if (nodeId === "start") return false
      setNodes((nds) => nds.filter((node) => node.id !== nodeId))
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
      setSelectedNode(null)
      setIsDirty(true)
      return true
    },
    [setNodes, setEdges],
  )

  const handleSave = useCallback(async () => {
    if (!onSave || isSaving) return
    setIsSaving(true)
    try {
      await onSave(nodes, edges)
      setIsDirty(false)
    } catch (error) {
      console.error("Error saving flow:", error)
    } finally {
      setIsSaving(false)
    }
  }, [nodes, edges, onSave, isSaving])

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  return {
    nodes,
    edges,
    selectedNode,
    isDirty,
    isSaving,
    flowStats,
    setSelectedNode,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    addNodeAtPosition,
    updateNode,
    deleteNode,
    handleSave,
    transporterID,
  }
}
