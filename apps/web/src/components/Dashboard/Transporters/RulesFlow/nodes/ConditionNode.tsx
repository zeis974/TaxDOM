"use client"

import { memo, type ReactNode } from "react"
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

const conditionIcons: Record<ConditionType, ReactNode> = {
  eu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  individual: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  amount: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
}

const conditionConfig: Record<ConditionType, { label: string; color: string }> = {
  eu: { label: "Origine UE ?", color: "#3b82f6" },
  individual: { label: "Particulier ?", color: "#3498db" },
  amount: { label: "Montant", color: "#06b6d4" },
}

const operatorLabels: Record<ConditionOperator, string> = {
  lt: "<",
  lte: "≤",
  gt: ">",
  gte: "≥",
  eq: "=",
}

function ConditionNode({ data }: NodeProps<ConditionNodeType>) {
  const conditionType = data.conditionType || "eu"
  const config = conditionConfig[conditionType]
  const icon = conditionIcons[conditionType]
  const isOrphaned = data.isOrphaned ?? false

  const getConditionDisplay = () => {
    if (conditionType === "amount" && data.operator && data.value !== undefined) {
      return `${operatorLabels[data.operator]} ${data.value}€`
    }
    return ""
  }

  const ariaLabel =
    conditionType === "amount"
      ? `Condition: ${config.label} ${getConditionDisplay()}`
      : `Condition: ${data.label || config.label}`

  return (
    <ConditionNodeContainer data-orphaned={isOrphaned} role="treeitem" aria-label={ariaLabel}>
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
        <NodeIcon style={{ color: config.color }}>{icon}</NodeIcon>
        {data.label || config.label}
      </NodeLabel>
      {conditionType === "amount" && <NodeValue>{getConditionDisplay()}</NodeValue>}

      {/* Handle Oui (gauche) */}
      {/* biome-ignore lint: React Flow handle identifier, not HTML id */}
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
      {/* biome-ignore lint: React Flow handle identifier, not HTML id */}
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

export default memo(ConditionNode)
