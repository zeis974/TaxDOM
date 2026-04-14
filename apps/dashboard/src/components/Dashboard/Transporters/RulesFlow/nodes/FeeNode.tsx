import { Handle, type Node, type NodeProps, Position } from "@xyflow/react"
import { FeeNodeContainer, NodeLabel, NodeValue } from "../RulesFlow.styled"

export type FeeNodeData = { label?: string; fee?: number; isOrphaned?: boolean }
export type FeeNodeType = Node<FeeNodeData, "fee">

function FeeNode({ data }: NodeProps<FeeNodeType>) {
  const isOrphaned = data.isOrphaned ?? false

  return (
    <FeeNodeContainer data-orphaned={isOrphaned} style={{ borderColor: "#f97316" }}>
      <NodeLabel>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        {data.label || "Frais"}
      </NodeLabel>
      {data.fee !== undefined && <NodeValue>{data.fee}€</NodeValue>}
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
    </FeeNodeContainer>
  )
}

export default FeeNode
