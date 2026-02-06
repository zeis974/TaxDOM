import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import vine from "@vinejs/vine"
import {
  SaveFlowBodySchema,
  SaveRulesBodySchema,
  SaveAllBodySchema,
} from "../validators/TransporterRulesValidator.js"

import { db } from "#config/database"

import {
  transporterFeeRules,
  transporterFlowNodes,
  transporterFlowEdges,
  transporters,
} from "#database/schema"

interface ValidatedFlowNode {
  nodeID?: string
  nodeType: "start" | "condition" | "fee"
  positionX: number
  positionY: number
  nodeData: Record<string, unknown>
}

interface ValidatedFlowEdge {
  edgeID?: string
  sourceNodeID: string
  targetNodeID: string
  sourceHandle?: "yes" | "no" | "default"
  edgeLabel?: string
}

interface ValidatedFeeRule {
  ruleID?: string
  minAmount: number | null
  maxAmount: number | null
  isIndividual: boolean | null
  originIsEU: boolean | null
  fee: string
  priority: number
}

function getAuthenticatedUser(ctx: HttpContext): { id?: string; email?: string } | null {
  return (
    ((ctx as Record<string, unknown>).__authenticatedUser as { id?: string; email?: string }) ??
    null
  )
}

const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function validateTransporterId(transporterId: unknown): transporterId is string {
  return (
    typeof transporterId === "string" &&
    transporterId.length > 0 &&
    UUID_V7_REGEX.test(transporterId)
  )
}

export default class TransporterRulesController {
  /**
   * Get all flow data (nodes, edges, and rules) for a transporter
   */
  async show(ctx: HttpContext) {
    const { params, response } = ctx
    try {
      const { transporterId } = params

      if (!validateTransporterId(transporterId)) {
        return response.status(400).json({ error: "ID du transporteur invalide (UUIDv7)" })
      }

      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      const [nodes, edges, rules] = await Promise.all([
        db.query.transporterFlowNodes.findMany({
          where: eq(transporterFlowNodes.transporterID, transporterId),
        }),
        db.query.transporterFlowEdges.findMany({
          where: eq(transporterFlowEdges.transporterID, transporterId),
        }),
        db.query.transporterFeeRules.findMany({
          where: eq(transporterFeeRules.transporterID, transporterId),
          orderBy: (rules, { desc }) => [desc(rules.priority)],
        }),
      ])

      return {
        transporterID: transporterId,
        transporterName: transporter.transporterName,
        flowNodes: nodes,
        flowEdges: edges,
        feeRules: rules,
      }
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot get transporter rules")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save flow data (nodes and edges) for a transporter
   * This will replace all existing nodes and edges
   */
  async saveFlow(ctx: HttpContext) {
    const { params, request, response } = ctx
    try {
      const { transporterId } = params
      const authenticatedUser = getAuthenticatedUser(ctx)

      if (!validateTransporterId(transporterId)) {
        return response.status(400).json({ error: "ID du transporteur invalide (UUIDv7)" })
      }

      let nodes: ValidatedFlowNode[]
      let edges: ValidatedFlowEdge[]
      try {
        const parsed = await vine.validate({ schema: SaveFlowBodySchema, data: request.body() })
        nodes = parsed.nodes as ValidatedFlowNode[]
        edges = parsed.edges as ValidatedFlowEdge[]
      } catch (err) {
        return response
          .status(400)
          .json({ error: "Données invalides", details: (err as { messages?: unknown }).messages })
      }

      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      logger.info(
        { userId: authenticatedUser?.id, transporterId },
        "[DASHBOARD]: Saving transporter flow",
      )

      await db.transaction(async (tx) => {
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
              nodeData: node.nodeData,
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
              throw new Error(`Edge references non-existent source node: ${edge.sourceNodeID}`)
            }
            if (!targetNodeID || !validNodeIds.has(targetNodeID)) {
              throw new Error(`Edge references non-existent target node: ${edge.targetNodeID}`)
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

      return response.status(200).json({
        message: "Flow sauvegardé avec succès",
      })
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Edge references")) {
        return response.status(400).json({ error: err.message })
      }
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter flow")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save fee rules for a transporter
   * This will replace all existing rules
   */
  async saveRules(ctx: HttpContext) {
    const { params, request, response } = ctx
    try {
      const { transporterId } = params
      const authenticatedUser = getAuthenticatedUser(ctx)

      if (!validateTransporterId(transporterId)) {
        return response.status(400).json({ error: "ID du transporteur invalide (UUIDv7)" })
      }

      let rules: ValidatedFeeRule[]
      try {
        const parsed = await vine.validate({ schema: SaveRulesBodySchema, data: request.body() })
        rules = parsed.rules as ValidatedFeeRule[]
      } catch (err) {
        return response
          .status(400)
          .json({ error: "Données invalides", details: (err as { messages?: unknown }).messages })
      }

      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      logger.info(
        { userId: authenticatedUser?.id, transporterId },
        "[DASHBOARD]: Saving transporter rules",
      )

      await db.transaction(async (tx) => {
        await tx
          .delete(transporterFeeRules)
          .where(eq(transporterFeeRules.transporterID, transporterId))

        if (rules && rules.length > 0) {
          const rulesToInsert = rules.map((rule) => ({
            ruleID: rule.ruleID || uuidv7(),
            transporterID: transporterId,
            minAmount: rule.minAmount,
            maxAmount: rule.maxAmount,
            isIndividual: rule.isIndividual,
            originIsEU: rule.originIsEU,
            fee: rule.fee,
            priority: rule.priority,
          }))
          await tx.insert(transporterFeeRules).values(rulesToInsert)
        }
      })

      return response.status(200).json({
        message: "Règles sauvegardées avec succès",
      })
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter rules")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save both flow and rules at once (convenience method)
   */
  async saveAll(ctx: HttpContext) {
    const { params, request, response } = ctx
    try {
      const { transporterId } = params
      const authenticatedUser = getAuthenticatedUser(ctx)

      if (!validateTransporterId(transporterId)) {
        return response.status(400).json({ error: "ID du transporteur invalide (UUIDv7)" })
      }

      let nodes: ValidatedFlowNode[]
      let edges: ValidatedFlowEdge[]
      let rules: ValidatedFeeRule[]
      try {
        const parsed = await vine.validate({ schema: SaveAllBodySchema, data: request.body() })
        nodes = parsed.nodes as ValidatedFlowNode[]
        edges = parsed.edges as ValidatedFlowEdge[]
        rules = parsed.rules as ValidatedFeeRule[]
      } catch (err) {
        return response
          .status(400)
          .json({ error: "Données invalides", details: (err as { messages?: unknown }).messages })
      }

      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      logger.info(
        { userId: authenticatedUser?.id, transporterId },
        "[DASHBOARD]: Saving transporter flow and rules",
      )

      await db.transaction(async (tx) => {
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
              nodeData: node.nodeData,
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
              throw new Error(`Edge references non-existent source node: ${edge.sourceNodeID}`)
            }
            if (!targetNodeID || !validNodeIds.has(targetNodeID)) {
              throw new Error(`Edge references non-existent target node: ${edge.targetNodeID}`)
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
            minAmount: rule.minAmount,
            maxAmount: rule.maxAmount,
            isIndividual: rule.isIndividual,
            originIsEU: rule.originIsEU,
            fee: rule.fee,
            priority: rule.priority,
          }))
          await tx.insert(transporterFeeRules).values(rulesToInsert)
        }
      })

      return response.status(200).json({
        message: "Flow et règles sauvegardés avec succès",
      })
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Edge references")) {
        return response.status(400).json({ error: err.message })
      }
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter data")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }
}
