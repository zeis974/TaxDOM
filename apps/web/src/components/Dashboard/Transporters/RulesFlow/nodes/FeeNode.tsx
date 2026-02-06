"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { FeeNodeContainer, NodeLabel, NodeValue, NodeIcon, NodeBadge } from "../RulesFlow.styled"

export type FeeNodeData = {
  label?: string
  fee?: number
  isOrphaned?: boolean
}

export type FeeNodeType = Node<FeeNodeData, "fee">

const FeeIconSvg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

function FeeNode({ data }: NodeProps<FeeNodeType>) {
  const fee = data.fee ?? 0
  const isOrphaned = data.isOrphaned ?? false

  return (
    <FeeNodeContainer
      data-orphaned={isOrphaned}
      role="treeitem"
      aria-label={`Frais: ${fee.toFixed(2)} euros`}
    >
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
        <NodeIcon style={{ color: "#f97316" }}>{FeeIconSvg}</NodeIcon>
        {data.label || "Frais"}
      </NodeLabel>
      <NodeValue>
        <NodeBadge>{fee.toFixed(2)} €</NodeBadge>
      </NodeValue>
    </FeeNodeContainer>
  )
}

export default memo(FeeNode)
