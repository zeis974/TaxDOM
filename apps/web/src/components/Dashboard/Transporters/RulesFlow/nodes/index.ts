export { default as StartNode } from "./StartNode"
export { default as ConditionNode } from "./ConditionNode"
export { default as FeeNode } from "./FeeNode"

export type { StartNodeData, StartNodeType } from "./StartNode"
export type { ConditionNodeData, ConditionNodeType } from "./ConditionNode"
export type { FeeNodeData, FeeNodeType } from "./FeeNode"

// Type union pour tous les types de nœuds de l'application
import type { StartNodeType } from "./StartNode"
import type { ConditionNodeType } from "./ConditionNode"
import type { FeeNodeType } from "./FeeNode"

export type AppNode = StartNodeType | ConditionNodeType | FeeNodeType
