"use client"

import type { FlowNodeData, TransporterFlowEdge, TransporterFlowNode } from "@taxdom/types"
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react"
import { useCallback, useMemo, useRef, useState } from "react"

import { getDefaultFlow } from "../defaultFlows"

type FlowPosition = { x: number; y: number }
type NodeType = "condition" | "fee"

const DEFAULT_NODE_OFFSET_Y = 150
const DEFAULT_START_X = 250
const DEFAULT_START_Y = 150

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

export function flowNodesToDbNodes(
  nodes: Node[],
  transporterID: string,
): Omit<TransporterFlowNode, "nodeID">[] {
  return nodes.map((node) => ({
    transporterID,
    nodeType: node.type as TransporterFlowNode["nodeType"],
    positionX: Math.round(node.position.x),
    positionY: Math.round(node.position.y),
    nodeData: node.data as FlowNodeData,
  }))
}

export function flowEdgesToDbEdges(
  edges: Edge[],
  transporterID: string,
): Omit<TransporterFlowEdge, "edgeID">[] {
  return edges.map((edge) => ({
    transporterID,
    sourceNodeID: edge.source,
    targetNodeID: edge.target,
    sourceHandle: (edge.sourceHandle as TransporterFlowEdge["sourceHandle"]) || null,
    edgeLabel: (edge.label as string) || null,
  }))
}

interface UseRulesFlowOptions {
  transporterID: string
  transporterName?: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
  onSave?: (nodes: Node[], edges: Edge[]) => Promise<void>
}

function calculateNewNodePosition(nodes: Node[]): FlowPosition {
  const lastNode = nodes[nodes.length - 1]
  return {
    x: lastNode ? lastNode.position.x : DEFAULT_START_X,
    y: lastNode ? lastNode.position.y + DEFAULT_NODE_OFFSET_Y : DEFAULT_START_Y,
  }
}

function canDeleteNode(nodeId: string): boolean {
  return nodeId !== "start"
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
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const orphanedNodeIds = useMemo(() => {
    const edgeTargets = new Set(edges.map((e) => e.target))
    const ids = new Set<string>()
    for (const node of nodes) {
      if (node.type === "start") continue
      if (!edgeTargets.has(node.id)) {
        ids.add(node.id)
      }
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
      if (hasRealChange) {
        setIsDirty(true)
      }
    },
    [onNodesChange],
  )

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes)
      const hasRealChange = changes.some(
        (c) => c.type === "add" || c.type === "remove" || c.type === "replace",
      )
      if (hasRealChange) {
        setIsDirty(true)
      }
    },
    [onEdgesChange],
  )

  const addNode = useCallback(
    (type: NodeType, data?: Record<string, unknown>) => {
      const newId = generateNodeId(type)
      const position = calculateNewNodePosition(nodes)
      const newNode: Node = {
        id: newId,
        type,
        position,
        data: data || {},
      }
      setNodes((nds) => [...nds, newNode])
      setIsDirty(true)
      return newId
    },
    [nodes, setNodes],
  )

  const addNodeAtPosition = useCallback(
    (type: NodeType, position: FlowPosition, data?: Record<string, unknown>) => {
      const newId = generateNodeId(type)
      const newNode: Node = {
        id: newId,
        type,
        position,
        data: data || {},
      }
      setNodes((nds) => [...nds, newNode])
      setIsDirty(true)
      return newId
    },
    [setNodes],
  )

  const updateNode = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      let found = false
      setNodes((nds) => {
        const nodeExists = nds.some((n) => n.id === nodeId)
        if (!nodeExists) {
          return nds
        }
        found = true
        return nds.map((node) => (node.id === nodeId ? { ...node, data } : node))
      })
      if (!found) {
        console.warn(`Node with id ${nodeId} not found`)
        return false
      }
      setIsDirty(true)
      return true
    },
    [setNodes],
  )

  const deleteNode = useCallback(
    (nodeId: string) => {
      if (!canDeleteNode(nodeId)) {
        console.warn("Cannot delete start node")
        return false
      }
      setNodes((nds) => nds.filter((node) => node.id !== nodeId))
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
      setSelectedNode(null)
      setIsDirty(true)
      return true
    },
    [setNodes, setEdges],
  )

  const duplicateNode = useCallback(
    (nodeId: string) => {
      const nodeToDuplicate = nodes.find((n) => n.id === nodeId)
      if (!nodeToDuplicate || nodeToDuplicate.type === "start") return null

      const newId = generateNodeId(nodeToDuplicate.type as NodeType)
      const newNode: Node = {
        ...nodeToDuplicate,
        id: newId,
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
      }
      setNodes((nds) => [...nds, newNode])
      setIsDirty(true)
      return newId
    },
    [nodes, setNodes],
  )

  const cleanOrphanedNodes = useCallback(() => {
    if (orphanedNodeIds.size === 0) return 0

    const orphanedIdsArray = Array.from(orphanedNodeIds)
    setNodes((nds) => nds.filter((n) => !orphanedNodeIds.has(n.id)))
    setEdges((eds) => eds.filter((e) => !orphanedNodeIds.has(e.source)))
    setIsDirty(true)
    return orphanedIdsArray.length
  }, [orphanedNodeIds, setNodes, setEdges])

  const handleSave = useCallback(async (): Promise<{ success: boolean; error?: Error }> => {
    if (!onSave) return { success: false, error: new Error("No save handler provided") }
    if (isSaving) return { success: false, error: new Error("Save already in progress") }

    setIsSaving(true)
    try {
      await onSave(nodes, edges)
      setIsDirty(false)
      return { success: true }
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error saving flow")
      console.error("Error saving flow:", err)
      return { success: false, error: err }
    } finally {
      setIsSaving(false)
    }
  }, [nodes, edges, onSave, isSaving])

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setShowAddPanel(false)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const resetToDefault = useCallback(() => {
    setNodes(defaultFlow.nodes)
    setEdges(defaultFlow.edges)
    setSelectedNode(null)
    setIsDirty(true)
  }, [defaultFlow, setNodes, setEdges])

  return {
    nodes,
    edges,
    selectedNode,
    showAddPanel,
    isDirty,
    isSaving,
    flowStats,
    setSelectedNode,
    setShowAddPanel,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    addNode,
    addNodeAtPosition,
    updateNode,
    deleteNode,
    duplicateNode,
    handleSave,
    resetToDefault,
    cleanOrphanedNodes,
    transporterID,
  }
}

export function createDefaultFlow(): { nodes: Node[]; edges: Edge[] } {
  return {
    nodes: [
      {
        id: "start",
        type: "start",
        position: { x: DEFAULT_START_X, y: 0 },
        data: { label: "Début" },
      },
    ],
    edges: [],
  }
}
