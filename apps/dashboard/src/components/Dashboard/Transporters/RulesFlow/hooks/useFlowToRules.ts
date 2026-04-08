import type { ConditionOperator, ConditionType, TransporterFeeRule } from "@taxdom/types"
import type { Edge, Node } from "@xyflow/react"

interface ConditionNodeData {
  conditionType: ConditionType
  operator?: ConditionOperator
  value?: number
}
interface FeeNodeData {
  fee: number
}

export interface FlowValidationError {
  type: string
  nodeId?: string
  message: string
}
export interface FlowValidationResult {
  isValid: boolean
  errors: FlowValidationError[]
  warnings: string[]
}

export function validateFlow(nodes: Node[], edges: Edge[]): FlowValidationResult {
  const errors: FlowValidationError[] = []
  const warnings: string[] = []
  const startNode = nodes.find((n) => n.type === "start")
  if (!startNode)
    errors.push({ type: "missing_start", message: "Le flow doit contenir un nœud de départ" })
  const edgeTargets = new Set(edges.map((e) => e.target))
  const orphanedNodes = nodes.filter((n) => n.type !== "start" && !edgeTargets.has(n.id))
  for (const node of orphanedNodes)
    warnings.push(
      `Le nœud "${(node.data as Record<string, unknown>).label || node.id}" n'est pas connecté`,
    )
  const feeNodes = nodes.filter((n) => n.type === "fee")
  if (feeNodes.length === 0)
    errors.push({ type: "missing_fee", message: "Le flow doit contenir au moins un nœud de frais" })
  return { isValid: errors.length === 0, errors, warnings }
}

export function flowToRules(
  nodes: Node[],
  edges: Edge[],
  transporterID: string,
): Omit<TransporterFeeRule, "ruleID" | "createdAt" | "updatedAt">[] {
  const rules: Omit<TransporterFeeRule, "ruleID" | "createdAt" | "updatedAt">[] = []
  const startNode = nodes.find((n) => n.type === "start")
  if (!startNode) return rules

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
      const data = node.data as Record<string, unknown>
      rules.push({
        transporterID,
        ...conditions,
        fee: String((data.fee as number) || 0),
        priority: 100 - depth,
      })
      return
    }
    if (node.type === "condition") {
      const data = node.data as Record<string, unknown>
      const yesEdge = edges.find((e) => e.source === nodeId && e.sourceHandle === "yes")
      const noEdge = edges.find((e) => e.source === nodeId && e.sourceHandle === "no")
      if (yesEdge) {
        const yesConditions = { ...conditions }
        applyCondition(yesConditions, data as ConditionNodeData, true)
        traverse(yesEdge.target, yesConditions, depth + 1)
      }
      if (noEdge) {
        const noConditions = { ...conditions }
        applyCondition(noConditions, data as ConditionNodeData, false)
        traverse(noEdge.target, noConditions, depth + 1)
      }
    }
    if (node.type === "start") {
      const defaultEdge = edges.find((e) => e.source === nodeId)
      if (defaultEdge) traverse(defaultEdge.target, conditions, depth)
    }
  }

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
          switch (condData.operator) {
            case "lt":
            case "lte":
              if (isYes) conditions.maxAmount = condData.value
              else conditions.minAmount = condData.value
              break
            case "gt":
            case "gte":
              if (isYes) conditions.minAmount = condData.value
              else conditions.maxAmount = condData.value
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

  traverse(
    startNode.id,
    { minAmount: null, maxAmount: null, isIndividual: null, originIsEU: null },
    0,
  )
  return rules
}
