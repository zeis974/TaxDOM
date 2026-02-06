"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import { StartNodeContainer, NodeLabel, NodeIcon } from "../RulesFlow.styled"

export type StartNodeData = {
  label?: string
}

export type StartNodeType = Node<StartNodeData, "start">

function StartNode({ data }: NodeProps<StartNodeType>) {
  return (
    <StartNodeContainer role="treeitem" aria-label={`Point de départ: ${data.label || "Début"}`}>
      <NodeLabel>
        <NodeIcon>🚀</NodeIcon>
        {data.label || "Début"}
      </NodeLabel>
      {/* biome-ignore lint: React Flow handle identifier, not HTML id */}
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

export default memo(StartNode)
