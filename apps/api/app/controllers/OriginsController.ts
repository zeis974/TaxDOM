import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { Origin } from "@taxdom/types"
import { asc, count, desc, eq, sql } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import { db } from "#config/database"
import { origins, products } from "#database/schema"

export default class OriginsController {
  /**
   * Get origins count
   */
  async count() {
    try {
      const total = await db.select({ count: count() }).from(origins)

      return { origins_count: total[0].count }
    } catch (err) {
      logger.error({ err }, "Cannot get origins count")
      console.error("[DASHBOARD]: Cannot get origins count", err)
    }
  }

  /**
   * Get public origins list (only names)
   */
  async list(): Promise<Omit<Origin, "originID" | "available">[]> {
    try {
      const originsData = await db.query.origins.findMany({
        where: (origins, { eq }) => eq(origins.available, true),
        columns: {
          originName: true,
          isEU: true,
        },
        orderBy: (origins, { asc }) => [asc(origins.originName)],
      })

      return originsData.map((origin) => ({
        name: origin.originName,
        isEU: origin.isEU,
      }))
    } catch (err) {
      console.error("Cannot get public origins list", err)
      logger.error({ err: err }, "[PUBLIC]: Cannot get public origins list")
      return []
    }
  }

  /**
   * Get detailed origins - for dashboard
   */
  async index(): Promise<(Origin & { productsCount: number })[]> {
    try {
      const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

      const rows = await db
        .select({
          originID: origins.originID,
          name: origins.originName,
          available: origins.available,
          isEU: origins.isEU,
          productsCount: productsCountExpr,
        })
        .from(origins)
        .leftJoin(products, eq(products.originID, origins.originID))
        .groupBy(origins.originID, origins.originName, origins.available, origins.isEU)
        .orderBy(asc(origins.originName))

      return rows.map((row) => ({
        ...row,
        productsCount: Number(row.productsCount ?? 0),
      }))
    } catch (err) {
      console.error("Cannot get origins", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot get origins")
      return []
    }
  }

  /**
   * Get top origins by product count
   */
  async top() {
    try {
      const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

      const rows = await db
        .select({
          originID: origins.originID,
          originName: origins.originName,
          isEU: origins.isEU,
          productsCount: productsCountExpr,
        })
        .from(origins)
        .leftJoin(products, eq(products.originID, origins.originID))
        .where(eq(origins.available, true))
        .groupBy(origins.originID, origins.originName, origins.isEU)
        .having(sql`count(${products.productID}) > 0`)
        .orderBy(desc(sql`count(${products.productID})`))
        .limit(5)

      return {
        top_origins: rows.map((row) => ({
          ...row,
          productsCount: Number(row.productsCount ?? 0),
        })),
      }
    } catch (err) {
      console.error("Cannot get top origins", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot get top origins")
      return { top_origins: [] }
    }
  }

  /**
   * Create a new origin
   */
  async store({ request, response }: HttpContext) {
    try {
      const { originName, isEU, available, isActive } = request.only([
        "originName",
        "isEU",
        "available",
        "isActive",
      ]) as {
        originName?: unknown
        isEU?: unknown
        available?: unknown
        isActive?: unknown
      }

      if (!originName || typeof originName !== "string" || originName.trim().length === 0) {
        return response.status(400).json({
          error: "Le nom de l'origine est requis",
        })
      }

      if (typeof isEU !== "boolean") {
        return response.status(400).json({
          error: "Le statut UE est requis",
        })
      }

      const resolvedAvailable =
        typeof available === "boolean" ? available : typeof isActive === "boolean" ? isActive : true

      const trimmedName = originName.trim().toUpperCase()
      const originID = uuidv7()

      const existingOrigin = await db.query.origins.findFirst({
        where: (origins, { eq }) => eq(origins.originName, trimmedName),
      })

      if (existingOrigin) {
        return response.status(409).json({
          error: "Une origine avec ce nom existe déjà",
        })
      }

      const newOrigin = await db
        .insert(origins)
        .values({
          originID,
          originName: trimmedName,
          available: resolvedAvailable,
          isEU,
        })
        .returning()

      return response.status(201).json({
        message: "Origine créée avec succès",
        origin: newOrigin[0],
      })
    } catch (err) {
      console.error("Cannot create origin", err)
      logger.error({ err: err }, "[DASHBOARD]: Cannot create origin")
      return response.status(500).json({
        error: "Erreur interne du serveur",
      })
    }
  }

  /**
   * Update an origin
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const originIdParam: string = params.id
      if (!originIdParam) return response.status(400).json({ error: "Paramètre manquant" })

      const { originName, available, isEU } = request.only(["originName", "available", "isEU"])

      const updateData: Partial<typeof origins.$inferInsert> = {}
      if (typeof originName === "string" && originName.trim().length > 0) {
        updateData.originName = originName.trim().toUpperCase()
      }
      if (typeof available === "boolean") {
        updateData.available = available
      }
      if (typeof isEU === "boolean") {
        updateData.isEU = isEU
      }

      if (Object.keys(updateData).length === 0) {
        return response.status(400).json({ error: "Aucune donnée à mettre à jour" })
      }

      const updated = await db
        .update(origins)
        .set(updateData)
        .where(eq(origins.originID, originIdParam))
        .returning()

      if (!updated?.[0]) {
        return response.status(404).json({ error: "Origine introuvable" })
      }

      return response.status(200).json({ message: "Origine mise à jour", origin: updated[0] })
    } catch (err) {
      console.error("Cannot update origin", err)
      logger.error({ err }, "[DASHBOARD]: Cannot update origin")
      return response.status(500).json({ error: "Erreur interne du serveur" })
    }
  }

  /**
   * Delete an origin
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const originIdParam: string = params.id
      if (!originIdParam) return response.status(400).json({ error: "Paramètre manquant" })

      const deleted = await db
        .delete(origins)
        .where(eq(origins.originID, originIdParam))
        .returning()

      if (!deleted?.[0]) {
        return response.status(404).json({ error: "Origine introuvable" })
      }

      return response.status(200).json({ message: "Origine supprimée" })
    } catch (err) {
      // Likely due to FK constraint
      console.error("Cannot delete origin", err)
      logger.error({ err }, "[DASHBOARD]: Cannot delete origin")
      return response
        .status(409)
        .json({ error: "Impossible de supprimer l'origine car elle est utilisée par des produits" })
    }
  }
}
