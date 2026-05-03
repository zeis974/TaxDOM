import type { Territory } from "@taxdom/types"
import { asc, count, desc, eq, sql } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import { products, territories } from "#database/schema"
import { ConflictError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

export type TerritoryCountResult = {
  territories_count: number
}

export type TerritoryPublicResult = {
  name: string
}

export type TerritoryWithProductCount = Territory & {
  productsCount: number
}

export type CreateTerritoryInput = {
  territoryName: string
}

export type UpdateTerritoryInput = {
  territoryName?: string
  available?: boolean
}

export class TerritoryService {
  constructor(private db: DB) {}

  async count(): Promise<TerritoryCountResult> {
    const total = await this.db.select({ count: count() }).from(territories)
    return { territories_count: total[0].count }
  }

  async findPublicList(): Promise<TerritoryPublicResult[]> {
    const territoriesData = await this.db.query.territories.findMany({
      where: (territories, { eq }) => eq(territories.available, true),
      columns: {
        territoryName: true,
      },
      orderBy: (territories, { asc }) => [asc(territories.territoryName)],
    })

    return territoriesData.map((territory) => ({ name: territory.territoryName }))
  }

  async findAll(): Promise<Territory[]> {
    const allTerritories = await this.db.query.territories.findMany({
      orderBy: (territories, { asc }) => [asc(territories.territoryName)],
    })

    return allTerritories || []
  }

  async findAllWithProductCount(): Promise<TerritoryWithProductCount[]> {
    const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

    const rows = await this.db
      .select({
        territoryID: territories.territoryID,
        territoryName: territories.territoryName,
        available: territories.available,
        productsCount: productsCountExpr,
      })
      .from(territories)
      .leftJoin(products, eq(products.territoryID, territories.territoryID))
      .groupBy(territories.territoryID, territories.territoryName, territories.available)
      .orderBy(asc(territories.territoryName))

    return rows.map((row) => ({
      territoryID: row.territoryID,
      territoryName: row.territoryName,
      available: row.available,
      productsCount: Number(row.productsCount ?? 0),
    }))
  }

  async findTopByProductCount(): Promise<{ top_territories: TerritoryWithProductCount[] }> {
    const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

    const rows = await this.db
      .select({
        territoryID: territories.territoryID,
        territoryName: territories.territoryName,
        available: territories.available,
        productsCount: productsCountExpr,
      })
      .from(territories)
      .leftJoin(products, eq(products.territoryID, territories.territoryID))
      .where(eq(territories.available, true))
      .groupBy(territories.territoryID, territories.territoryName, territories.available)
      .having(sql`count(${products.productID}) > 0`)
      .orderBy(desc(sql`count(${products.productID})`))
      .limit(5)

    return {
      top_territories: rows.map((row) => ({
        territoryID: row.territoryID,
        territoryName: row.territoryName,
        available: row.available,
        productsCount: Number(row.productsCount ?? 0),
      })),
    }
  }

  async create(input: CreateTerritoryInput): Promise<Territory> {
    const trimmedName = input.territoryName.trim().toUpperCase()

    const existingTerritory = await this.db.query.territories.findFirst({
      where: (territories, { eq }) => eq(territories.territoryName, trimmedName),
    })

    if (existingTerritory) {
      throw new ConflictError("Un territoire avec ce nom existe déjà")
    }

    const territoryID = uuidv7()
    const [newTerritory] = await this.db
      .insert(territories)
      .values({
        territoryID,
        territoryName: trimmedName,
        available: true,
      })
      .returning()

    return {
      territoryID: newTerritory.territoryID,
      territoryName: newTerritory.territoryName,
      available: newTerritory.available,
    }
  }

  async update(territoryId: string, input: UpdateTerritoryInput): Promise<Territory> {
    const updateData: Partial<typeof territories.$inferInsert> = {}

    if (input.territoryName) {
      updateData.territoryName = input.territoryName.trim().toUpperCase()
    }
    if (input.available !== undefined) {
      updateData.available = input.available
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("Aucune donnée à mettre à jour")
    }

    const [updated] = await this.db
      .update(territories)
      .set(updateData)
      .where(eq(territories.territoryID, territoryId))
      .returning()

    if (!updated) {
      throw new NotFoundError("Territoire introuvable")
    }

    return {
      territoryID: updated.territoryID,
      territoryName: updated.territoryName,
      available: updated.available,
    }
  }

  async delete(territoryId: string): Promise<void> {
    try {
      const [deleted] = await this.db
        .delete(territories)
        .where(eq(territories.territoryID, territoryId))
        .returning()

      if (!deleted) {
        throw new NotFoundError("Territoire introuvable")
      }
    } catch (err) {
      if (err && typeof err === "object" && "code" in err && err.code === "23503") {
        throw new ConflictError(
          "Impossible de supprimer le territoire car il est utilisé par des produits",
        )
      }
      throw err
    }
  }
}
