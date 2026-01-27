import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import { db } from "#config/database"
import {
  transporterFeeRules,
  transporterFlowNodes,
  transporterFlowEdges,
  transporters,
} from "#database/schema"

export default class TransporterRulesController {
  /**
   * Get all flow data (nodes, edges, and rules) for a transporter
   */
  async show({ params, response }: HttpContext) {
    try {
      const { transporterId } = params

      if (!transporterId) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      // Vérifier que le transporteur existe
      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      // Récupérer les nœuds, edges et règles
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
      console.error("Cannot get transporter rules", err)
      logger.error({ err }, "[DASHBOARD]: Cannot get transporter rules")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save flow data (nodes and edges) for a transporter
   * This will replace all existing nodes and edges
   */
  async saveFlow({ params, request, response }: HttpContext) {
    try {
      const { transporterId } = params
      const { nodes, edges } = request.body() as {
        nodes: Array<{
          nodeID?: string
          nodeType: string
          positionX: number
          positionY: number
          nodeData: Record<string, unknown>
        }>
        edges: Array<{
          edgeID?: string
          sourceNodeID: string
          targetNodeID: string
          sourceHandle?: string
          edgeLabel?: string
        }>
      }

      if (!transporterId) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      // Vérifier que le transporteur existe
      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      // Transaction pour supprimer et recréer les nœuds et edges
      await db.transaction(async (tx) => {
        // Supprimer les anciennes données
        await tx
          .delete(transporterFlowEdges)
          .where(eq(transporterFlowEdges.transporterID, transporterId))
        await tx
          .delete(transporterFlowNodes)
          .where(eq(transporterFlowNodes.transporterID, transporterId))

        // Créer un mapping des IDs temporaires vers les nouveaux IDs
        const idMapping: Record<string, string> = {}

        // Insérer les nouveaux nœuds
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

        // Insérer les nouvelles edges avec les IDs mappés
        if (edges && edges.length > 0) {
          const edgesToInsert = edges.map((edge) => ({
            edgeID: edge.edgeID || uuidv7(),
            transporterID: transporterId,
            sourceNodeID: idMapping[edge.sourceNodeID] || edge.sourceNodeID,
            targetNodeID: idMapping[edge.targetNodeID] || edge.targetNodeID,
            sourceHandle: edge.sourceHandle || null,
            edgeLabel: edge.edgeLabel || null,
          }))
          await tx.insert(transporterFlowEdges).values(edgesToInsert)
        }
      })

      return response.status(200).json({
        message: "Flow sauvegardé avec succès",
      })
    } catch (err) {
      console.error("Cannot save transporter flow", err)
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter flow")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save fee rules for a transporter
   * This will replace all existing rules
   */
  async saveRules({ params, request, response }: HttpContext) {
    try {
      const { transporterId } = params
      const { rules } = request.body() as {
        rules: Array<{
          ruleID?: string
          minAmount: number | null
          maxAmount: number | null
          isIndividual: boolean | null
          originIsEU: boolean | null
          fee: string
          priority: number
        }>
      }

      if (!transporterId) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      // Vérifier que le transporteur existe
      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      // Transaction pour supprimer et recréer les règles
      await db.transaction(async (tx) => {
        // Supprimer les anciennes règles
        await tx
          .delete(transporterFeeRules)
          .where(eq(transporterFeeRules.transporterID, transporterId))

        // Insérer les nouvelles règles
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
      console.error("Cannot save transporter rules", err)
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter rules")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Save both flow and rules at once (convenience method)
   */
  async saveAll({ params, request, response }: HttpContext) {
    try {
      const { transporterId } = params
      const { nodes, edges, rules } = request.body() as {
        nodes: Array<{
          nodeID?: string
          nodeType: string
          positionX: number
          positionY: number
          nodeData: Record<string, unknown>
        }>
        edges: Array<{
          edgeID?: string
          sourceNodeID: string
          targetNodeID: string
          sourceHandle?: string
          edgeLabel?: string
        }>
        rules: Array<{
          ruleID?: string
          minAmount: number | null
          maxAmount: number | null
          isIndividual: boolean | null
          originIsEU: boolean | null
          fee: string
          priority: number
        }>
      }

      if (!transporterId) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      // Vérifier que le transporteur existe
      const transporter = await db.query.transporters.findFirst({
        where: eq(transporters.transporterID, transporterId),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      // Transaction pour tout sauvegarder atomiquement
      await db.transaction(async (tx) => {
        // Supprimer les anciennes données
        await tx
          .delete(transporterFlowEdges)
          .where(eq(transporterFlowEdges.transporterID, transporterId))
        await tx
          .delete(transporterFlowNodes)
          .where(eq(transporterFlowNodes.transporterID, transporterId))
        await tx
          .delete(transporterFeeRules)
          .where(eq(transporterFeeRules.transporterID, transporterId))

        // Mapping des IDs
        const idMapping: Record<string, string> = {}

        // Insérer les nœuds
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

        // Insérer les edges
        if (edges && edges.length > 0) {
          const edgesToInsert = edges.map((edge) => ({
            edgeID: edge.edgeID || uuidv7(),
            transporterID: transporterId,
            sourceNodeID: idMapping[edge.sourceNodeID] || edge.sourceNodeID,
            targetNodeID: idMapping[edge.targetNodeID] || edge.targetNodeID,
            sourceHandle: edge.sourceHandle || null,
            edgeLabel: edge.edgeLabel || null,
          }))
          await tx.insert(transporterFlowEdges).values(edgesToInsert)
        }

        // Insérer les règles
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
      console.error("Cannot save transporter data", err)
      logger.error({ err }, "[DASHBOARD]: Cannot save transporter data")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }
}
