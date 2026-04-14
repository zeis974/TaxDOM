import { Handle, type Node, type NodeProps, Position } from "@xyflow/react"
import { NodeLabel, StartNodeContainer } from "../RulesFlow.styled"

export type StartNodeType = Node<{ label?: string }, "start">

function StartNode({ data }: NodeProps<StartNodeType>) {
  return (
    <StartNodeContainer>
      <NodeLabel>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        {data.label || "Début"}
      </NodeLabel>
      <Handle type="source" position={Position.Bottom} id="default" />
    </StartNodeContainer>
  )
}

export default StartNode
