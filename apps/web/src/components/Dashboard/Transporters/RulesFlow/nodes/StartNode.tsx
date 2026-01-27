"use client"

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { StartNodeContainer, NodeLabel, NodeIcon } from "../RulesFlow.styled"

export type StartNodeData = {
  label?: string
}

export type StartNodeType = Node<StartNodeData, "start">

export default function StartNode({ data }: NodeProps<StartNodeType>) {
  return (
    <StartNodeContainer>
      <NodeLabel>
        <NodeIcon>🚀</NodeIcon>
        {data.label || "Début"}
      </NodeLabel>
      <Handle
        type="source"
        position={Position.Bottom}
        id="default"
        style={{
          background: "#ffffff",
          border: "2px solid #22c55e",
          width: 12,
          height: 12,
        }}
      />
    </StartNodeContainer>
  )
}
