"use client"

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { FeeNodeContainer, NodeLabel, NodeValue, NodeIcon, NodeBadge } from "../RulesFlow.styled"

export type FeeNodeData = {
  label?: string
  fee?: number
  isOrphaned?: boolean
}

export type FeeNodeType = Node<FeeNodeData, "fee">

export default function FeeNode({ data }: NodeProps<FeeNodeType>) {
  const fee = data.fee ?? 0
  const isOrphaned = data.isOrphaned ?? false

  return (
    <FeeNodeContainer data-orphaned={isOrphaned}>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#ffffff",
          border: "2px solid #f97316",
          width: 12,
          height: 12,
        }}
      />

      <NodeLabel>
        <NodeIcon>📦</NodeIcon>
        {data.label || "Frais"}
      </NodeLabel>
      <NodeValue>
        <NodeBadge>{fee.toFixed(2)} €</NodeBadge>
      </NodeValue>
    </FeeNodeContainer>
  )
}
