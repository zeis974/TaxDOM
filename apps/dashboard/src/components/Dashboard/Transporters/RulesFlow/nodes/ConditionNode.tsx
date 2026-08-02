import type { ConditionOperator, ConditionType } from "@taxdom/types"
import { Handle, type Node, type NodeProps, Position } from "@xyflow/react"
import { token } from "@/panda/tokens"
import { ConditionNodeContainer, HandleLabel, NodeLabel, NodeValue } from "../RulesFlow.styled"

export type ConditionNodeData = {
  label?: string
  conditionType?: ConditionType
  operator?: ConditionOperator
  value?: number
  isOrphaned?: boolean
}
export type ConditionNodeType = Node<ConditionNodeData, "condition">

const conditionLabels: Record<ConditionType, string> = {
  eu: "Origine UE ?",
  individual: "Particulier ?",
  amount: "Montant",
}

const operatorLabels: Record<ConditionOperator, string> = {
  lt: "<",
  lte: "≤",
  gt: ">",
  gte: "≥",
  eq: "=",
}

// React Flow ships its own stylesheet for handles, and it is imported after
// Panda's. Inline styles are the only reliable way to win that cascade, so the
// colors come through `token.var` rather than a styled class.
const yesColor = token.var("colors.accentGreen")
const noColor = token.var("colors.errorFg")

function ConditionNode({ data }: NodeProps<ConditionNodeType>) {
  const conditionType = data.conditionType || "eu"
  const isOrphaned = data.isOrphaned ?? false

  const detail =
    conditionType === "amount" && data.operator && data.value !== undefined
      ? `${operatorLabels[data.operator]} ${data.value}€`
      : ""

  return (
    <ConditionNodeContainer data-condition={conditionType} data-orphaned={isOrphaned}>
      <NodeLabel>{data.label || conditionLabels[conditionType]}</NodeLabel>
      {detail && <NodeValue>{detail}</NodeValue>}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: token.var("colors.textMuted") }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: "30%", background: yesColor }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: "70%", background: noColor }}
      />
      <HandleLabel style={{ bottom: "-20px", left: "20%", color: yesColor }}>Oui</HandleLabel>
      <HandleLabel style={{ bottom: "-20px", left: "65%", color: noColor }}>Non</HandleLabel>
    </ConditionNodeContainer>
  )
}

export default ConditionNode
