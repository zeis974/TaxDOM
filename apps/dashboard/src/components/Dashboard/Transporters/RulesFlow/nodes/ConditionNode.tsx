import type { ConditionOperator, ConditionType } from "@taxdom/types"
import { Handle, type Node, type NodeProps, Position } from "@xyflow/react"
import type { ReactNode } from "react"
import { ConditionNodeContainer, HandleLabel, NodeLabel, NodeValue } from "../RulesFlow.styled"

export type ConditionNodeData = {
  label?: string
  conditionType?: ConditionType
  operator?: ConditionOperator
  value?: number
  isOrphaned?: boolean
}
export type ConditionNodeType = Node<ConditionNodeData, "condition">

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
  const isOrphaned = data.isOrphaned ?? false

  const getConditionDisplay = () => {
    if (conditionType === "amount" && data.operator && data.value !== undefined)
      return `${operatorLabels[data.operator]} ${data.value}€`
    return ""
  }

  return (
    <ConditionNodeContainer data-orphaned={isOrphaned} style={{ borderColor: config.color }}>
      <NodeLabel>{config.label}</NodeLabel>
      {getConditionDisplay() && <NodeValue>{getConditionDisplay()}</NodeValue>}
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: "30%", background: "#22c55e" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: "70%", background: "#ef4444" }}
      />
      <HandleLabel style={{ bottom: "-20px", left: "20%", color: "#22c55e" }}>Oui</HandleLabel>
      <HandleLabel style={{ bottom: "-20px", left: "65%", color: "#ef4444" }}>Non</HandleLabel>
    </ConditionNodeContainer>
  )
}

export default ConditionNode
