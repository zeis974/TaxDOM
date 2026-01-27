"use client"

import type { Node, Edge } from "@xyflow/react"
import type { TransporterFeeRule, ConditionType, ConditionOperator } from "@taxdom/types"

// Types pour les données des nœuds
interface ConditionNodeData {
  conditionType: ConditionType
  operator?: ConditionOperator
  value?: number
  label?: string
}

interface FeeNodeData {
  fee: number
  label?: string
}

// Type pour les conditions accumulées pendant le parcours (utilisé en interne)
type AccumulatedConditions = {
  minAmount: number | null
  maxAmount: number | null
  isIndividual: boolean | null
  originIsEU: boolean | null
}

// Type pour les erreurs de validation du flow
export interface FlowValidationError {
  type:
    | "missing_start"
    | "orphaned_node"
    | "missing_fee"
    | "circular_reference"
    | "invalid_condition"
  nodeId?: string
  message: string
}

// Type pour le résultat de la validation
export interface FlowValidationResult {
  isValid: boolean
  errors: FlowValidationError[]
  warnings: string[]
}

/**
 * Valide un flow avant la conversion en règles
 */
export function validateFlow(nodes: Node[], edges: Edge[]): FlowValidationResult {
  const errors: FlowValidationError[] = []
  const warnings: string[] = []

  // Vérifier la présence du nœud Start
  const startNode = nodes.find((n) => n.type === "start")
  if (!startNode) {
    errors.push({
      type: "missing_start",
      message: "Le flow doit contenir un nœud de départ",
    })
  }

  // Vérifier les nœuds orphelins (sans connexion entrante, sauf start)
  const orphanedNodes = nodes.filter((n) => {
    if (n.type === "start") return false
    return !edges.some((e) => e.target === n.id)
  })

  for (const node of orphanedNodes) {
    warnings.push(`Le nœud "${node.data?.label || node.id}" n'est pas connecté`)
  }

  // Vérifier qu'il y a au moins un nœud de frais atteignable
  const feeNodes = nodes.filter((n) => n.type === "fee")
  if (feeNodes.length === 0) {
    errors.push({
      type: "missing_fee",
      message: "Le flow doit contenir au moins un nœud de frais",
    })
  }

  // Vérifier les références circulaires (parcours en profondeur)
  const visited = new Set<string>()
  const recursionStack = new Set<string>()

  function detectCycle(nodeId: string): boolean {
    visited.add(nodeId)
    recursionStack.add(nodeId)

    const outgoingEdges = edges.filter((e) => e.source === nodeId)
    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        if (detectCycle(edge.target)) return true
      } else if (recursionStack.has(edge.target)) {
        return true
      }
    }

    recursionStack.delete(nodeId)
    return false
  }

  if (startNode && detectCycle(startNode.id)) {
    errors.push({
      type: "circular_reference",
      message: "Le flow contient une référence circulaire",
    })
  }

  // Vérifier les conditions de type "amount" ont bien operator et value
  const conditionNodes = nodes.filter((n) => n.type === "condition")
  for (const node of conditionNodes) {
    const data = node.data as unknown as ConditionNodeData
    if (data.conditionType === "amount") {
      if (!data.operator || data.value === undefined) {
        errors.push({
          type: "invalid_condition",
          nodeId: node.id,
          message: `La condition "${data.label || node.id}" de type montant nécessite un opérateur et une valeur`,
        })
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Parcours l'arbre de décision React Flow et génère les règles de frais correspondantes.
 * Chaque chemin du nœud Start vers un nœud Fee génère une règle.
 */
export function flowToRules(
  nodes: Node[],
  edges: Edge[],
  transporterID: string,
): Omit<TransporterFeeRule, "ruleID" | "createdAt" | "updatedAt">[] {
  const rules: Omit<TransporterFeeRule, "ruleID" | "createdAt" | "updatedAt">[] = []
  const startNode = nodes.find((n) => n.type === "start")

  if (!startNode) return rules

  // Fonction récursive pour parcourir l'arbre
  function traverse(
    nodeId: string,
    conditions: {
      minAmount: number | null
      maxAmount: number | null
      isIndividual: boolean | null
      originIsEU: boolean | null
    },
    depth: number,
  ) {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    if (node.type === "fee") {
      // On a atteint un nœud de frais, créer une règle
      const feeData = node.data as unknown as FeeNodeData
      rules.push({
        transporterID,
        ...conditions,
        fee: String(feeData.fee || 0),
        priority: 100 - depth, // Plus le chemin est court, plus la priorité est haute
      })
      return
    }

    if (node.type === "condition") {
      const condData = node.data as unknown as ConditionNodeData

      // Trouver les edges sortantes
      const yesEdge = edges.find((e) => e.source === nodeId && e.sourceHandle === "yes")
      const noEdge = edges.find((e) => e.source === nodeId && e.sourceHandle === "no")

      // Branche "Oui"
      if (yesEdge) {
        const yesConditions = { ...conditions }
        applyCondition(yesConditions, condData, true)
        traverse(yesEdge.target, yesConditions, depth + 1)
      }

      // Branche "Non"
      if (noEdge) {
        const noConditions = { ...conditions }
        applyCondition(noConditions, condData, false)
        traverse(noEdge.target, noConditions, depth + 1)
      }
    }

    // Pour le nœud Start, suivre l'edge par défaut
    if (node.type === "start") {
      const defaultEdge = edges.find((e) => e.source === nodeId)
      if (defaultEdge) {
        traverse(defaultEdge.target, conditions, depth)
      }
    }
  }

  // Appliquer une condition aux règles
  function applyCondition(
    conditions: {
      minAmount: number | null
      maxAmount: number | null
      isIndividual: boolean | null
      originIsEU: boolean | null
    },
    condData: ConditionNodeData,
    isYes: boolean,
  ) {
    switch (condData.conditionType) {
      case "eu":
        conditions.originIsEU = isYes
        break
      case "individual":
        conditions.isIndividual = isYes
        break
      case "amount":
        if (condData.operator && condData.value !== undefined) {
          // Pour "montant < X", si Oui => maxAmount = X, si Non => minAmount = X
          switch (condData.operator) {
            case "lt":
            case "lte":
              if (isYes) {
                conditions.maxAmount = condData.value
              } else {
                conditions.minAmount = condData.value
              }
              break
            case "gt":
            case "gte":
              if (isYes) {
                conditions.minAmount = condData.value
              } else {
                conditions.maxAmount = condData.value
              }
              break
            case "eq":
              if (isYes) {
                conditions.minAmount = condData.value
                conditions.maxAmount = condData.value + 1
              }
              break
          }
        }
        break
    }
  }

  // Démarrer le parcours depuis le nœud Start
  traverse(
    startNode.id,
    {
      minAmount: null,
      maxAmount: null,
      isIndividual: null,
      originIsEU: null,
    },
    0,
  )

  return rules
}

/**
 * Génère un arbre de décision React Flow à partir des règles existantes.
 * C'est l'opération inverse de flowToRules.
 *
 * Note: Cette fonction génère un arbre simple, elle ne reconstruit pas
 * exactement l'arbre original si celui-ci était plus complexe.
 */
export function rulesToFlow(rules: TransporterFeeRule[]): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // Toujours commencer par un nœud Start
  nodes.push({
    id: "start",
    type: "start",
    position: { x: 250, y: 0 },
    data: { label: "Début" },
  })

  if (rules.length === 0) {
    return { nodes, edges }
  }

  // Trier les règles par priorité (décroissante)
  const sortedRules = [...rules].sort((a, b) => b.priority - a.priority)

  let currentY = 100
  let nodeCounter = 0

  // Pour chaque règle, créer les nœuds de condition et de frais nécessaires
  // Cette implémentation simplifiée crée une chaîne linéaire
  // Une implémentation plus avancée pourrait optimiser l'arbre

  const lastNodeId = "start"

  for (const rule of sortedRules) {
    const conditionNodes: string[] = []

    // Créer des nœuds de condition pour chaque critère non-null
    if (rule.originIsEU !== null) {
      const nodeId = `condition-eu-${nodeCounter++}`
      nodes.push({
        id: nodeId,
        type: "condition",
        position: { x: 250, y: currentY },
        data: { conditionType: "eu" as ConditionType },
      })
      conditionNodes.push(nodeId)
      currentY += 120
    }

    if (rule.isIndividual !== null) {
      const nodeId = `condition-individual-${nodeCounter++}`
      nodes.push({
        id: nodeId,
        type: "condition",
        position: { x: 250, y: currentY },
        data: { conditionType: "individual" as ConditionType },
      })
      conditionNodes.push(nodeId)
      currentY += 120
    }

    if (rule.minAmount !== null || rule.maxAmount !== null) {
      const nodeId = `condition-amount-${nodeCounter++}`
      const value = rule.maxAmount || rule.minAmount || 0
      const operator: ConditionOperator = rule.maxAmount ? "lt" : "gte"
      nodes.push({
        id: nodeId,
        type: "condition",
        position: { x: 250, y: currentY },
        data: {
          conditionType: "amount" as ConditionType,
          operator,
          value,
        },
      })
      conditionNodes.push(nodeId)
      currentY += 120
    }

    // Créer le nœud de frais
    const feeNodeId = `fee-${nodeCounter++}`
    nodes.push({
      id: feeNodeId,
      type: "fee",
      position: { x: 250, y: currentY },
      data: { fee: Number(rule.fee) },
    })
    currentY += 150

    // Connecter les nœuds
    if (conditionNodes.length > 0) {
      // Connecter le dernier nœud au premier nœud de condition
      edges.push({
        id: `edge-${lastNodeId}-${conditionNodes[0]}`,
        source: lastNodeId,
        target: conditionNodes[0],
        sourceHandle: lastNodeId === "start" ? "default" : "yes",
        animated: true,
      })

      // Connecter les conditions entre elles
      for (let i = 0; i < conditionNodes.length - 1; i++) {
        edges.push({
          id: `edge-${conditionNodes[i]}-${conditionNodes[i + 1]}`,
          source: conditionNodes[i],
          target: conditionNodes[i + 1],
          sourceHandle: "yes",
          animated: true,
        })
      }

      // Connecter la dernière condition au nœud de frais
      edges.push({
        id: `edge-${conditionNodes[conditionNodes.length - 1]}-${feeNodeId}`,
        source: conditionNodes[conditionNodes.length - 1],
        target: feeNodeId,
        sourceHandle: "yes",
        animated: true,
      })
    } else {
      // Pas de conditions, connecter directement au nœud de frais
      edges.push({
        id: `edge-${lastNodeId}-${feeNodeId}`,
        source: lastNodeId,
        target: feeNodeId,
        sourceHandle: lastNodeId === "start" ? "default" : "yes",
        animated: true,
      })
    }
  }

  return { nodes, edges }
}
