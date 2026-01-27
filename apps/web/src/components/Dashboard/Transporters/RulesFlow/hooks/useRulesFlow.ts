"use client"

import { useCallback, useState, useMemo } from "react"
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react"
import type { TransporterFlowNode, TransporterFlowEdge, FlowNodeData } from "@taxdom/types"
import { getDefaultFlow } from "../defaultFlows"

// Types internes pour améliorer la lisibilité
type FlowPosition = { x: number; y: number }
type NodeType = "condition" | "fee"

// Constantes pour les positions par défaut
const DEFAULT_NODE_OFFSET_Y = 150
const DEFAULT_START_X = 250
const DEFAULT_START_Y = 150

// Convertir les données de la BDD vers le format React Flow
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

// Convertir les données React Flow vers le format BDD
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

/**
 * Génère un ID unique pour un nouveau nœud
 */
function generateNodeId(type: NodeType): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Calcule la position d'un nouveau nœud basé sur le dernier nœud existant
 */
function calculateNewNodePosition(nodes: Node[]): FlowPosition {
  const lastNode = nodes[nodes.length - 1]
  return {
    x: lastNode ? lastNode.position.x : DEFAULT_START_X,
    y: lastNode ? lastNode.position.y + DEFAULT_NODE_OFFSET_Y : DEFAULT_START_Y,
  }
}

/**
 * Valide qu'un nœud peut être supprimé
 */
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
  // Convertir les données initiales ou utiliser le flow par défaut du transporteur
  const defaultFlow = useMemo(() => getDefaultFlow(transporterName), [transporterName])

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

  // Calculer les IDs des nœuds orphelins (memoized)
  const orphanedNodeIds = useMemo(() => {
    const ids = new Set<string>()
    for (const node of nodes) {
      if (node.type === "start") continue
      const hasIncomingEdge = edges.some((e) => e.target === node.id)
      if (!hasIncomingEdge) {
        ids.add(node.id)
      }
    }
    return ids
  }, [nodes, edges])

  // Statistiques du flow (memoized)
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

  // Gérer les connexions avec validation
  const onConnect = useCallback(
    (connection: Connection) => {
      // Vérifier si cette connexion existe déjà
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

  // Wrapper pour marquer comme modifié
  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes)
      // Marquer comme dirty seulement pour les vrais changements (pas les sélections)
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
      // Ne pas marquer dirty pour les suppressions liées aux suppressions de nodes
      const hasRealChange = changes.some((c) => c.type !== "remove")
      if (hasRealChange) {
        setIsDirty(true)
      }
    },
    [onEdgesChange],
  )

  // Ajouter un nœud avec ID unique garanti
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
      return newId // Retourne l'ID pour une utilisation potentielle
    },
    [nodes, setNodes],
  )

  // Ajouter un nœud à une position spécifique (pour le drag & drop)
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

  // Mettre à jour un nœud avec validation
  const updateNode = useCallback(
    (nodeId: string, data: Record<string, unknown>) => {
      const existingNode = nodes.find((n) => n.id === nodeId)
      if (!existingNode) {
        console.warn(`Node with id ${nodeId} not found`)
        return false
      }
      setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data } : node)))
      setIsDirty(true)
      return true
    },
    [setNodes, nodes],
  )

  // Supprimer un nœud avec nettoyage des edges
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

  // Dupliquer un nœud
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

  // Nettoyer les nœuds orphelins (non connectés)
  const cleanOrphanedNodes = useCallback(() => {
    const orphanedIds = nodes
      .filter((n) => {
        if (n.type === "start") return false
        return !edges.some((e) => e.target === n.id)
      })
      .map((n) => n.id)

    if (orphanedIds.length === 0) return 0

    setNodes((nds) => nds.filter((n) => !orphanedIds.includes(n.id)))
    setEdges((eds) => eds.filter((e) => !orphanedIds.includes(e.source)))
    setIsDirty(true)
    return orphanedIds.length
  }, [nodes, edges, setNodes, setEdges])

  // Sauvegarder avec état de chargement
  const handleSave = useCallback(async () => {
    if (!onSave || isSaving) return false

    setIsSaving(true)
    try {
      await onSave(nodes, edges)
      setIsDirty(false)
      return true
    } catch (error) {
      console.error("Error saving flow:", error)
      return false
    } finally {
      setIsSaving(false)
    }
  }, [nodes, edges, onSave, isSaving])

  // Gérer le clic sur un nœud
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setShowAddPanel(false)
  }, [])

  // Gérer le clic sur le fond (désélectionner)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Réinitialiser au flow par défaut
  const resetToDefault = useCallback(() => {
    setNodes(defaultFlow.nodes)
    setEdges(defaultFlow.edges)
    setSelectedNode(null)
    setIsDirty(true)
  }, [defaultFlow, setNodes, setEdges])

  return {
    // État
    nodes,
    edges,
    selectedNode,
    showAddPanel,
    isDirty,
    isSaving,
    flowStats,

    // Setters
    setSelectedNode,
    setShowAddPanel,

    // Handlers pour React Flow
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,

    // Actions sur les nodes
    addNode,
    addNodeAtPosition,
    updateNode,
    deleteNode,
    duplicateNode,

    // Actions globales
    handleSave,
    resetToDefault,
    cleanOrphanedNodes,

    // Meta
    transporterID,
  }
}

/**
 * Fonction utilitaire pour créer un flow par défaut vide
 */
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
