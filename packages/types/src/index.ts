export type Origin = {
  originID: string
  name: string
  available: boolean
  isEU: boolean
}

export type Territory = {
  territoryID: string
  territoryName: string
  available: boolean
}

export type Transporter = {
  transporterID: string
  transporterName: string
  available: boolean
}

export type TransporterFeeRule = {
  ruleID: string
  transporterID: string
  minAmount: number | null
  maxAmount: number | null
  isIndividual: boolean | null
  originIsEU: boolean | null
  fee: string
  priority: number
  createdAt?: Date
  updatedAt?: Date
}

export type FlowNodeType = "start" | "condition" | "fee"
export type ConditionType = "eu" | "individual" | "amount"
export type ConditionOperator = "lt" | "lte" | "gt" | "gte" | "eq"

export type FlowNodeData = {
  label?: string
  conditionType?: ConditionType
  operator?: ConditionOperator
  value?: number | boolean
  fee?: number
}

export type TransporterFlowNode = {
  nodeID: string
  transporterID: string
  nodeType: FlowNodeType
  positionX: number
  positionY: number
  nodeData: FlowNodeData
}

export type FlowEdgeHandle = "yes" | "no" | "default"

export type TransporterFlowEdge = {
  edgeID: string
  transporterID: string
  sourceNodeID: string
  targetNodeID: string
  sourceHandle: FlowEdgeHandle | null
  edgeLabel: string | null
}

export type TransporterWithRules = Transporter & {
  feeRules: TransporterFeeRule[]
  flowNodes: TransporterFlowNode[]
  flowEdges: TransporterFlowEdge[]
}

export type Category = {
  categoryID: string
  categoryName: string
  taxes?: {
    tva: number
    om: number
    omr: number
  }
}

export type Product = {
  productID: string
  productName: string
  category: {
    categoryID: string
    categoryName: string
  }
  origin: {
    originID: string
    originName: string
    isEU: boolean
  }
  territory: {
    territoryID: string
    territoryName: string
  }
  flux: {
    fluxID: string
    fluxName: string
  }
  tax: {
    taxID: string
    tva: number
    om: number
    omr: number
  }
  createdAt: Date
  updatedAt: Date
}

export type SelectOption = {
  name: string
  value?: string
  available?: boolean
  isEU?: boolean
}

export type TaxSimulatorResult = {
  product: string
  taxes: {
    tva: number
    om: number
    omr: number
  }
}

export type ParcelSimulatorResult = {
  carrierFee: number
  dutyPrice: number
  totalTaxes: number
  taxes: {
    applicable: "yes" | "no" | "maybe"
    om: number
    omr: number
    tva: number
  }
  products: {
    name: string
    price: number
  }[]
}
