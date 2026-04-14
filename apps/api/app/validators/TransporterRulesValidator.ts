import vine from "@vinejs/vine"

export const ConditionNodeDataSchema = vine.object({
  conditionType: vine.enum(["eu", "individual", "amount"]),
  operator: vine.enum(["lt", "lte", "gt", "gte", "eq"]).optional(),
  value: vine.number().min(0).max(1_000_000).optional(),
  label: vine.string().maxLength(100).optional(),
})

export const FeeNodeDataSchema = vine.object({
  fee: vine.number().min(0).max(10_000).optional(),
  label: vine.string().maxLength(100).optional(),
})

export const StartNodeDataSchema = vine.object({
  label: vine.string().maxLength(100).optional(),
})

export const NodeDataSchema = vine.union([
  ConditionNodeDataSchema,
  FeeNodeDataSchema,
  StartNodeDataSchema,
])

export const FlowNodeSchema = vine.object({
  nodeID: vine.string().maxLength(100).optional(),
  nodeType: vine.enum(["start", "condition", "fee"]),
  positionX: vine.number().min(-50_000).max(50_000),
  positionY: vine.number().min(-50_000).max(50_000),
  nodeData: NodeDataSchema,
})

export const FlowEdgeSchema = vine.object({
  edgeID: vine.string().maxLength(100).optional(),
  sourceNodeID: vine.string().maxLength(100),
  targetNodeID: vine.string().maxLength(100),
  sourceHandle: vine.enum(["yes", "no", "default"]).optional(),
  edgeLabel: vine.string().maxLength(50).optional(),
})

export const FeeRuleSchema = vine.object({
  ruleID: vine.string().maxLength(100).optional(),
  minAmount: vine.number().min(0).max(1_000_000).nullable(),
  maxAmount: vine.number().min(0).max(1_000_000).nullable(),
  isIndividual: vine.boolean().nullable(),
  originIsEU: vine.boolean().nullable(),
  fee: vine.string().regex(/^\d+(\.\d{1,2})?$/),
  priority: vine.number().min(0).max(1000),
})

export const SaveFlowBodySchema = vine.object({
  nodes: vine.array(FlowNodeSchema).maxLength(500),
  edges: vine.array(FlowEdgeSchema).maxLength(1000),
})

export const SaveRulesBodySchema = vine.object({
  rules: vine.array(FeeRuleSchema).maxLength(200),
})

export const SaveAllBodySchema = vine.object({
  nodes: vine.array(FlowNodeSchema).maxLength(500),
  edges: vine.array(FlowEdgeSchema).maxLength(1000),
  rules: vine.array(FeeRuleSchema).maxLength(200),
})
