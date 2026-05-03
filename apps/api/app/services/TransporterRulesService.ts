import { eq, type InferSelectModel } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import {
  transporterFeeRules,
  transporterFlowEdges,
  transporterFlowNodes,
  transporters,
} from "#database/schema"
import { BadRequestError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

export type FlowNodeInput = {
  nodeID?: string
  nodeType: "start" | "condition" | "fee"
  positionX: number
  positionY: number
  nodeData?: Record<string, unknown>
}

export type FlowEdgeInput = {
  edgeID?: string
  sourceNodeID: string
  targetNodeID: string
  sourceHandle?: "yes" | "no" | "default"
  edgeLabel?: string
}

export type FeeRuleInput = {
  ruleID?: string
  minAmount: number | null
  maxAmount: number | null
  isIndividual: boolean | null
  originIsEU: boolean | null
  fee: string
  priority: number
}

export type TransporterRulesResult = {
  transporterID: string
  transporterName: string
  flowNodes: InferSelectModel<typeof transporterFlowNodes>[]
  flowEdges: InferSelectModel<typeof transporterFlowEdges>[]
  feeRules: InferSelectModel<typeof transporterFeeRules>[]
}

export class TransporterRulesService {
  constructor(private db: DB) {}

  private async assertTransporterExists(transporterId: string): Promise<string> {
    const transporter = await this.db.query.transporters.findFirst({
      where: eq(transporters.transporterID, transporterId),
    })

    if (!transporter) {
      throw new NotFoundError("Transporteur introuvable")
    }

    return transporter.transporterName
  }

  /**
   * Get all flow data (nodes, edges, and rules) for a transporter.
   */
  async findByTransporterId(transporterId: string): Promise<TransporterRulesResult> {
    const transporterName = await this.assertTransporterExists(transporterId)

    const [nodes, edges, rules] = await Promise.all([
      this.db.query.transporterFlowNodes.findMany({
        where: eq(transporterFlowNodes.transporterID, transporterId),
      }),
      this.db.query.transporterFlowEdges.findMany({
        where: eq(transporterFlowEdges.transporterID, transporterId),
      }),
      this.db.query.transporterFeeRules.findMany({
        where: eq(transporterFeeRules.transporterID, transporterId),
        orderBy: (rules, { desc }) => [desc(rules.priority)],
      }),
    ])

    return {
      transporterID: transporterId,
      transporterName,
      flowNodes: nodes,
      flowEdges: edges,
      feeRules: rules,
    }
  }

  /**
   * Save flow data (nodes and edges) for a transporter.
   * This will replace all existing nodes and edges.
   */
  async saveFlow(
    transporterId: string,
    nodes: FlowNodeInput[],
    edges: FlowEdgeInput[],
  ): Promise<void> {
    await this.assertTransporterExists(transporterId)

    await this.db.transaction(async (tx) => {
      await tx
        .delete(transporterFlowEdges)
        .where(eq(transporterFlowEdges.transporterID, transporterId))
      await tx
        .delete(transporterFlowNodes)
        .where(eq(transporterFlowNodes.transporterID, transporterId))

      const idMapping: Record<string, string> = {}

      if (nodes && nodes.length > 0) {
        const nodesToInsert = nodes.map((node) => {
          const newId = node.nodeID || uuidv7()
          idMapping[node.nodeID || newId] = newId
          return {
            nodeID: newId,
            transporterID: transporterId,
            nodeType: node.nodeType,
            positionX: node.positionX,
            positionY: node.positionY,
            nodeData: node.nodeData ?? {},
          }
        })
        await tx.insert(transporterFlowNodes).values(nodesToInsert)
      }

      if (edges && edges.length > 0) {
        const validNodeIds = new Set(Object.values(idMapping))
        const edgesToInsert = edges.map((edge) => {
          const sourceNodeID = idMapping[edge.sourceNodeID]
          const targetNodeID = idMapping[edge.targetNodeID]

          if (!sourceNodeID || !validNodeIds.has(sourceNodeID)) {
            throw new BadRequestError(
              `Edge references non-existent source node: ${edge.sourceNodeID}`,
            )
          }
          if (!targetNodeID || !validNodeIds.has(targetNodeID)) {
            throw new BadRequestError(
              `Edge references non-existent target node: ${edge.targetNodeID}`,
            )
          }

          return {
            edgeID: edge.edgeID || uuidv7(),
            transporterID: transporterId,
            sourceNodeID,
            targetNodeID,
            sourceHandle: edge.sourceHandle || null,
            edgeLabel: edge.edgeLabel || null,
          }
        })
        await tx.insert(transporterFlowEdges).values(edgesToInsert)
      }
    })
  }

  /**
   * Save fee rules for a transporter.
   * This will replace all existing rules.
   */
  async saveRules(transporterId: string, rules: FeeRuleInput[]): Promise<void> {
    await this.assertTransporterExists(transporterId)

    await this.db.transaction(async (tx) => {
      await tx
        .delete(transporterFeeRules)
        .where(eq(transporterFeeRules.transporterID, transporterId))

      if (rules && rules.length > 0) {
        const rulesToInsert = rules.map((rule) => ({
          ruleID: rule.ruleID || uuidv7(),
          transporterID: transporterId,
          minAmount: rule.minAmount !== null ? String(rule.minAmount) : null,
          maxAmount: rule.maxAmount !== null ? String(rule.maxAmount) : null,
          isIndividual: rule.isIndividual,
          originIsEU: rule.originIsEU,
          fee: rule.fee,
          priority: rule.priority,
        }))
        await tx.insert(transporterFeeRules).values(rulesToInsert)
      }
    })
  }

  /**
   * Save both flow and rules at once (convenience method).
   */
  async saveAll(
    transporterId: string,
    nodes: FlowNodeInput[],
    edges: FlowEdgeInput[],
    rules: FeeRuleInput[],
  ): Promise<void> {
    await this.assertTransporterExists(transporterId)

    await this.db.transaction(async (tx) => {
      await tx
        .delete(transporterFlowEdges)
        .where(eq(transporterFlowEdges.transporterID, transporterId))
      await tx
        .delete(transporterFlowNodes)
        .where(eq(transporterFlowNodes.transporterID, transporterId))
      await tx
        .delete(transporterFeeRules)
        .where(eq(transporterFeeRules.transporterID, transporterId))

      const idMapping: Record<string, string> = {}

      if (nodes && nodes.length > 0) {
        const nodesToInsert = nodes.map((node) => {
          const newId = node.nodeID || uuidv7()
          idMapping[node.nodeID || newId] = newId
          return {
            nodeID: newId,
            transporterID: transporterId,
            nodeType: node.nodeType,
            positionX: node.positionX,
            positionY: node.positionY,
            nodeData: node.nodeData ?? {},
          }
        })
        await tx.insert(transporterFlowNodes).values(nodesToInsert)
      }

      if (edges && edges.length > 0) {
        const validNodeIds = new Set(Object.values(idMapping))
        const edgesToInsert = edges.map((edge) => {
          const sourceNodeID = idMapping[edge.sourceNodeID]
          const targetNodeID = idMapping[edge.targetNodeID]

          if (!sourceNodeID || !validNodeIds.has(sourceNodeID)) {
            throw new BadRequestError(
              `Edge references non-existent source node: ${edge.sourceNodeID}`,
            )
          }
          if (!targetNodeID || !validNodeIds.has(targetNodeID)) {
            throw new BadRequestError(
              `Edge references non-existent target node: ${edge.targetNodeID}`,
            )
          }

          return {
            edgeID: edge.edgeID || uuidv7(),
            transporterID: transporterId,
            sourceNodeID,
            targetNodeID,
            sourceHandle: edge.sourceHandle || null,
            edgeLabel: edge.edgeLabel || null,
          }
        })
        await tx.insert(transporterFlowEdges).values(edgesToInsert)
      }

      if (rules && rules.length > 0) {
        const rulesToInsert = rules.map((rule) => ({
          ruleID: rule.ruleID || uuidv7(),
          transporterID: transporterId,
          minAmount: rule.minAmount !== null ? String(rule.minAmount) : null,
          maxAmount: rule.maxAmount !== null ? String(rule.maxAmount) : null,
          isIndividual: rule.isIndividual,
          originIsEU: rule.originIsEU,
          fee: rule.fee,
          priority: rule.priority,
        }))
        await tx.insert(transporterFeeRules).values(rulesToInsert)
      }
    })
  }

  /**
   * Delete all flow data and rules for a transporter.
   */
  async deleteByTransporterId(transporterId: string): Promise<void> {
    await this.assertTransporterExists(transporterId)

    await this.db.transaction(async (tx) => {
      await tx
        .delete(transporterFlowEdges)
        .where(eq(transporterFlowEdges.transporterID, transporterId))
      await tx
        .delete(transporterFlowNodes)
        .where(eq(transporterFlowNodes.transporterID, transporterId))
      await tx
        .delete(transporterFeeRules)
        .where(eq(transporterFeeRules.transporterID, transporterId))
    })
  }
}
