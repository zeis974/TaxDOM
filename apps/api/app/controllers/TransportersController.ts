import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { count, eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import { db } from "#config/database"
import { transporters } from "#database/schema"
import {
  CreateTransporterValidator,
  UpdateTransporterValidator,
} from "#validators/TransporterValidator"

export default class TransportersController {
  /**
   * Get transporters count
   */
  async count({ response }: HttpContext) {
    try {
      const [result] = await db.select({ count: count() }).from(transporters)

      return { transporters_count: result.count }
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot get transporters count")
      return response.status(500).json({ error: "Erreur lors du comptage des transporteurs" })
    }
  }

  /**
   * Get public transporters list (only names) - for client side
   */
  async list({ response }: HttpContext) {
    try {
      const transportersData = await db.query.transporters.findMany({
        where: (t, { eq }) => eq(t.available, true),
        columns: {
          transporterName: true,
        },
        orderBy: (t, { asc }) => [asc(t.transporterName)],
      })

      return transportersData.map((transporter) => ({ name: transporter.transporterName }))
    } catch (err) {
      logger.error({ err }, "[PUBLIC]: Cannot get public transporters list")
      return response
        .status(500)
        .json({ error: "Erreur lors de la récupération des transporteurs" })
    }
  }

  /**
   * Get transporters - for dashboard (with full details)
   */
  async index({ response }: HttpContext) {
    try {
      const allTransporters = await db.query.transporters.findMany({
        orderBy: (t, { asc }) => [asc(t.transporterName)],
      })

      return allTransporters
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot get transporters")
      return response
        .status(500)
        .json({ error: "Erreur lors de la récupération des transporteurs" })
    }
  }

  /**
   * Get a single transporter by ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const { id } = params
      if (!id) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      const transporter = await db.query.transporters.findFirst({
        where: (t, { eq }) => eq(t.transporterID, id),
      })

      if (!transporter) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      return transporter
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot get transporter")
      return response.status(500).json({ error: "Erreur lors de la récupération du transporteur" })
    }
  }

  /**
   * Create a new transporter
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateTransporterValidator)
      const trimmedName = payload.transporterName.toUpperCase()

      const existingTransporter = await db.query.transporters.findFirst({
        where: (t, { eq }) => eq(t.transporterName, trimmedName),
      })

      if (existingTransporter) {
        return response.status(409).json({
          error: "Un transporteur avec ce nom existe déjà",
        })
      }

      const [newTransporter] = await db
        .insert(transporters)
        .values({
          transporterID: uuidv7(),
          transporterName: trimmedName,
          available: true,
        })
        .returning()

      return response.status(201).json({
        message: "Transporteur créé avec succès",
        transporter: newTransporter,
      })
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot create transporter")
      return response.status(500).json({
        error: "Erreur interne du serveur",
      })
    }
  }

  /**
   * Update a transporter
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      if (!id) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      const payload = await request.validateUsing(UpdateTransporterValidator)

      const updateData: Partial<typeof transporters.$inferInsert> = {}

      if (payload.transporterName) {
        updateData.transporterName = payload.transporterName.toUpperCase()
      }
      if (typeof payload.available === "boolean") {
        updateData.available = payload.available
      }

      if (Object.keys(updateData).length === 0) {
        return response.status(400).json({ error: "Aucune donnée à mettre à jour" })
      }

      const [updated] = await db
        .update(transporters)
        .set(updateData)
        .where(eq(transporters.transporterID, id))
        .returning()

      if (!updated) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      return response.status(200).json({
        message: "Transporteur mis à jour",
        transporter: updated,
      })
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot update transporter")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Delete a transporter
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params
      if (!id) {
        return response.status(400).json({ error: "ID du transporteur requis" })
      }

      const [deleted] = await db
        .delete(transporters)
        .where(eq(transporters.transporterID, id))
        .returning()

      if (!deleted) {
        return response.status(404).json({ error: "Transporteur introuvable" })
      }

      return response.status(200).json({ message: "Transporteur supprimé" })
    } catch (err) {
      logger.error({ err }, "[DASHBOARD]: Cannot delete transporter")
      return response.status(500).json({
        error: "Impossible de supprimer le transporteur",
      })
    }
  }
}
