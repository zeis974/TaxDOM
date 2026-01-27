"use client"

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import type { ConditionType, ConditionOperator } from "@taxdom/types"
import {
  ConditionNodeContainer,
  NodeLabel,
  NodeValue,
  HandleLabel,
  NodeIcon,
} from "../RulesFlow.styled"

export type ConditionNodeData = {
  label?: string
  conditionType?: ConditionType
  operator?: ConditionOperator
  value?: number | boolean
  isOrphaned?: boolean
}

export type ConditionNodeType = Node<ConditionNodeData, "condition">

const conditionConfig: Record<ConditionType, { label: string; icon: string }> = {
  eu: { label: "Origine UE ?", icon: "🇪🇺" },
  individual: { label: "Particulier ?", icon: "👤" },
  amount: { label: "Montant", icon: "💰" },
}

const operatorLabels: Record<ConditionOperator, string> = {
  lt: "<",
  lte: "≤",
  gt: ">",
  gte: "≥",
  eq: "=",
}

export default function ConditionNode({ data }: NodeProps<ConditionNodeType>) {
  const conditionType = data.conditionType || "eu"
  const config = conditionConfig[conditionType]
  const isOrphaned = data.isOrphaned ?? false

  const getConditionDisplay = () => {
    if (conditionType === "amount" && data.operator && data.value !== undefined) {
      return `${operatorLabels[data.operator]} ${data.value}€`
    }
    return ""
  }

  return (
    <ConditionNodeContainer data-orphaned={isOrphaned}>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#ffffff",
          border: "2px solid #3b82f6",
          width: 12,
          height: 12,
        }}
      />

      <NodeLabel>
        <NodeIcon>{config.icon}</NodeIcon>
        {data.label || config.label}
      </NodeLabel>
      {conditionType === "amount" && <NodeValue>{getConditionDisplay()}</NodeValue>}

      {/* Handle Oui (gauche) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{
          left: "30%",
          background: "#22c55e",
          width: 10,
          height: 10,
        }}
      />
      <HandleLabel style={{ bottom: "-28px", left: "15%", color: "#16a34a" }}>✓ Oui</HandleLabel>

      {/* Handle Non (droite) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{
          left: "70%",
          background: "#ef4444",
          width: 10,
          height: 10,
        }}
      />
      <HandleLabel style={{ bottom: "-28px", left: "55%", color: "#dc2626" }}>✗ Non</HandleLabel>
    </ConditionNodeContainer>
  )
}
