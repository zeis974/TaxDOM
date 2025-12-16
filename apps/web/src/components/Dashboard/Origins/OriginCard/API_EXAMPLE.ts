/**
 * EXEMPLE DE RÉPONSE API POUR LES ORIGINES AVEC LOGS
 * ===================================================
 *
 * Ce fichier montre comment structurer la réponse API pour inclure
 * les logs d'historique avec chaque origine.
 */

import type { Origin } from "@taxdom/types"

// Type étendu avec les logs (à ajouter dans @taxdom/types)
type OriginWithLogs = Origin & {
  logs?: Array<{
    id: string
    action: "created" | "updated" | "approved" | "rejected" | "deleted"
    description: string
    timestamp: string
    user?: string
  }>
  productsCount?: number
}

// Exemple de réponse API complète
export const EXAMPLE_API_RESPONSE: OriginWithLogs[] = [
  {
    originID: "8x8x67b0c78e-1...",
    name: "France Métropolitaine",
    available: true,
    isEU: true,
    productsCount: 42,
    logs: [
      {
        id: "log_001",
        action: "approved",
        description: "L'origine a été approuvée par la personne autorisée.",
        timestamp: "2025-01-04T23:59:42.000Z",
        user: "Victoria Krets",
      },
      {
        id: "log_002",
        action: "updated",
        description: "Le nom de l'origine a été modifié de 'FRANCE' à 'France Métropolitaine'.",
        timestamp: "2025-01-03T14:22:10.000Z",
        user: "Jean Dupont",
      },
      {
        id: "log_003",
        action: "created",
        description: "Origine créée et sauvegardée dans le système.",
        timestamp: "2025-01-01T10:15:30.000Z",
        user: "Système",
      },
    ],
  },
  {
    originID: "eu_belgium_001",
    name: "Belgique",
    available: true,
    isEU: true,
    productsCount: 18,
    logs: [
      {
        id: "log_004",
        action: "updated",
        description: "Statut de disponibilité activé.",
        timestamp: "2024-12-20T16:45:00.000Z",
        user: "Admin",
      },
      {
        id: "log_005",
        action: "created",
        description: "Origine Belgique créée.",
        timestamp: "2024-12-15T09:30:00.000Z",
        user: "Système",
      },
    ],
  },
  {
    originID: "non_eu_usa_001",
    name: "États-Unis",
    available: false,
    isEU: false,
    productsCount: 0,
    logs: [
      {
        id: "log_006",
        action: "rejected",
        description: "Origine désactivée suite à des problèmes de documentation.",
        timestamp: "2024-12-28T11:20:00.000Z",
        user: "Responsable Conformité",
      },
      {
        id: "log_007",
        action: "created",
        description: "Origine États-Unis créée.",
        timestamp: "2024-12-01T08:00:00.000Z",
        user: "Système",
      },
    ],
  },
]

/**
 * STRUCTURE DU SCHÉMA DRIZZLE
 * ============================
 */

/*
import { pgTable, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core"

export const origins = pgTable("origins", {
  originID: varchar("origin_id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  available: boolean("available").default(false).notNull(),
  isEU: boolean("is_eu").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const originLogs = pgTable("origin_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  originID: varchar("origin_id", { length: 255 })
    .notNull()
    .references(() => origins.originID, { onDelete: "cascade" }),
  action: varchar("action", { length: 50 }).notNull(),
  description: text("description").notNull(),
  userName: varchar("user_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
*/

/**
 * EXEMPLE DE CONTROLLER ADONISJS
 * ===============================
 */

/*
export default class OriginsController {
  async index({ response }: HttpContext) {
    const origins = await db.query.origins.findMany({
      with: {
        logs: {
          orderBy: (logs, { desc }) => [desc(logs.createdAt)],
          limit: 10,
        },
      },
    })

    // Compter les produits liés pour chaque origine
    const originsWithCount = await Promise.all(
      origins.map(async (origin) => {
        const productsCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(products)
          .where(eq(products.origin, origin.originID))

        return {
          ...origin,
          productsCount: productsCount[0]?.count ?? 0,
          logs: origin.logs.map((log) => ({
            id: log.id,
            action: log.action,
            description: log.description,
            timestamp: log.createdAt.toISOString(),
            user: log.userName,
          })),
        }
      })
    )

    return response.json(originsWithCount)
  }

  async update({ request, response, params }: HttpContext) {
    const { originName, available, isEU } = await request.validateUsing(updateOriginValidator)
    const { id } = params

    const origin = await db.query.origins.findFirst({
      where: eq(origins.originID, id),
    })

    if (!origin) {
      return response.notFound({ error: "Origine non trouvée" })
    }

    // Préparer la description du log
    const changes: string[] = []
    if (originName !== origin.name) {
      changes.push(`Nom modifié de "${origin.name}" à "${originName}"`)
    }
    if (available !== origin.available) {
      changes.push(`Statut ${available ? "activé" : "désactivé"}`)
    }
    if (isEU !== origin.isEU) {
      changes.push(`Zone ${isEU ? "ajoutée à" : "retirée de"} l'UE`)
    }

    // Mettre à jour l'origine
    await db
      .update(origins)
      .set({
        name: originName,
        available: available === "Oui",
        isEU: isEU === "Oui",
        updatedAt: new Date(),
      })
      .where(eq(origins.originID, id))

    // Créer un log
    await db.insert(originLogs).values({
      originID: id,
      action: "updated",
      description: changes.join(". "),
      userName: auth.user?.name ?? "Utilisateur",
    })

    return response.json({ success: true })
  }
}
*/
