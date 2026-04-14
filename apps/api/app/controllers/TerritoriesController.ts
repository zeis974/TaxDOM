import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { count, eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import { db } from "#config/database"
import { territories, products } from "#database/schema"

export default class TerritoriesController {
  /**
   * Get territories count
   */
  async count() {
    try {
      const total = await db.select({ count: count() }).from(territories)

      return { territories_count: total[0].count }
    } catch (err) {
      logger.error({ err }, "Cannot get territories count")
      console.error("[DASHBOARD]: Cannot get territories count", err)
    }
  }

  /**
   * Get public territories list (only names)
   */
  async list() {
    try {
      const territoriesData = await db.query.territories.findMany({
        where: (territories, { eq }) => eq(territories.available, true),
        columns: {
          territoryName: true,
        },
        orderBy: (territories, { asc }) => [asc(territories.territoryName)],
      })

      return territoriesData.map((territory) => ({ name: territory.territoryName }))
    } catch (err) {
      console.error("Cannot get public territories list", err)
      logger.error({ err: err }, "[PUBLIC]: Cannot get public territories list")
      return []
    }
  }

  /**
   * Get detailed territories - for dashboard
   */
  async index() {
    try {
      const allTerritories = await db.query.territories.findMany({
        orderBy: (territories, { asc }) => [asc(territories.territoryName)],
      })

      return allTerritories || []
    } catch (err) {
      console.error("Cannot get territories", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot get territories")
      return []
    }
  }

  /**
   * Get top territories by product count
   */
  async top() {
    try {
      const territoriesData = await db.query.territories.findMany({
        where: (territories, { eq }) => eq(territories.available, true),
      })

      const territoriesWithCount = await Promise.all(
        territoriesData.map(async (territory) => {
          const productsCount = await db
            .select({ count: count() })
            .from(products)
            .where(eq(products.territoryID, territory.territoryID))

          return {
            territoryID: territory.territoryID,
            territoryName: territory.territoryName,
            productsCount: productsCount[0]?.count ?? 0,
          }
        }),
      )

      const topTerritories = territoriesWithCount
        .filter((t) => t.productsCount > 0)
        .sort((a, b) => b.productsCount - a.productsCount)
        .slice(0, 5)

      return { top_territories: topTerritories }
    } catch (err) {
      console.error("Cannot get top territories", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot get top territories")
      return { top_territories: [] }
    }
  }

  /**
   * Show a specific territory (not implemented)
   */
  async show({ response }: HttpContext) {
    return response.status(404)
  }

  /**
   * Create a new territory
   */
  async store({ request, response }: HttpContext) {
    try {
      const { territoryName } = request.only(["territoryName"]) as {
        territoryName?: unknown
      }

      if (
        !territoryName ||
        typeof territoryName !== "string" ||
        territoryName.trim().length === 0
      ) {
        return response.status(400).json({
          error: "Le nom du territoire est requis",
        })
      }

      const trimmedName = territoryName.trim().toUpperCase()
      const territoryID = uuidv7()

      const existingTerritory = await db.query.territories.findFirst({
        where: (territories, { eq }) => eq(territories.territoryName, trimmedName),
      })

      if (existingTerritory) {
        return response.status(409).json({
          error: "Un territoire avec ce nom existe déjà",
        })
      }

      const newTerritory = await db
        .insert(territories)
        .values({
          territoryID,
          territoryName: trimmedName,
          available: true,
        })
        .returning()

      return response.status(201).json({
        message: "Territoire créé avec succès",
        territory: newTerritory[0],
      })
    } catch (err) {
      console.error("Cannot create territory", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot create territory")
      return response.status(500).json({
        error: "Erreur interne du serveur",
      })
    }
  }

  /**
   * Update a territory
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const territoryIdParam: string = params.id
      if (!territoryIdParam) return response.status(400).json({ error: "Paramètre manquant" })

      const { territoryName, available } = request.only(["territoryName", "available"])

      const updateData: Partial<typeof territories.$inferInsert> = {}
      if (typeof territoryName === "string" && territoryName.trim().length > 0) {
        updateData.territoryName = territoryName.trim().toUpperCase()
      }
      if (typeof available === "boolean") {
        updateData.available = available
      }

      if (Object.keys(updateData).length === 0) {
        return response.status(400).json({ error: "Aucune donnée à mettre à jour" })
      }

      const updated = await db
        .update(territories)
        .set(updateData)
        .where(eq(territories.territoryID, territoryIdParam))
        .returning()

      if (!updated?.[0]) {
        return response.status(404).json({ error: "Territoire introuvable" })
      }

      return response.status(200).json({ message: "Territoire mis à jour", territory: updated[0] })
    } catch (err) {
      console.error("Cannot update territory", err)
      logger.error({ err }, "[DASHBOARD]: Cannot update territory")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Delete a territory
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const territoryIdParam: string = params.id
      if (!territoryIdParam) return response.status(400).json({ error: "Paramètre manquant" })

      const deleted = await db
        .delete(territories)
        .where(eq(territories.territoryID, territoryIdParam))
        .returning()

      if (!deleted?.[0]) {
        return response.status(404).json({ error: "Territoire introuvable" })
      }

      return response.status(200).json({ message: "Territoire supprimé" })
    } catch (err) {
      console.error("Cannot delete territory", err)
      logger.error({ err }, "[DASHBOARD]: Cannot delete territory")
      return response.status(409).json({
        error: "Impossible de supprimer le territoire car il est utilisé par des produits",
      })
    }
  }
}
