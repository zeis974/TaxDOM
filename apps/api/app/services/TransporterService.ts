import type { Transporter } from "@taxdom/types"
import { count, eq } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import { transporters } from "#database/schema"
import { BadRequestError, ConflictError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

export type TransporterCountResult = {
  transporters_count: number
}

export type TransporterPublicResult = {
  name: string
}

export type CreateTransporterInput = {
  transporterName: string
}

export type UpdateTransporterInput = {
  transporterName?: string
  available?: boolean
}

export class TransporterService {
  constructor(private db: DB) {}

  async count(): Promise<TransporterCountResult> {
    const [result] = await this.db.select({ count: count() }).from(transporters)
    return { transporters_count: result.count }
  }

  async findPublicList(): Promise<TransporterPublicResult[]> {
    const transportersData = await this.db.query.transporters.findMany({
      where: (t, { eq }) => eq(t.available, true),
      columns: {
        transporterName: true,
      },
      orderBy: (t, { asc }) => [asc(t.transporterName)],
    })

    return transportersData.map((transporter) => ({ name: transporter.transporterName }))
  }

  async findAll(): Promise<Transporter[]> {
    const allTransporters = await this.db.query.transporters.findMany({
      orderBy: (t, { asc }) => [asc(t.transporterName)],
    })

    return allTransporters
  }

  async findById(transporterId: string): Promise<Transporter> {
    const transporter = await this.db.query.transporters.findFirst({
      where: (t, { eq }) => eq(t.transporterID, transporterId),
    })

    if (!transporter) {
      throw new NotFoundError("Transporteur introuvable")
    }

    return transporter
  }

  async create(input: CreateTransporterInput): Promise<Transporter> {
    const trimmedName = input.transporterName.toUpperCase()

    const existingTransporter = await this.db.query.transporters.findFirst({
      where: (t, { eq }) => eq(t.transporterName, trimmedName),
    })

    if (existingTransporter) {
      throw new ConflictError("Un transporteur avec ce nom existe déjà")
    }

    const [newTransporter] = await this.db
      .insert(transporters)
      .values({
        transporterID: uuidv7(),
        transporterName: trimmedName,
        available: true,
      })
      .returning()

    return newTransporter
  }

  async update(transporterId: string, input: UpdateTransporterInput): Promise<Transporter> {
    const updateData: Partial<typeof transporters.$inferInsert> = {}

    if (input.transporterName) {
      updateData.transporterName = input.transporterName.toUpperCase()
    }
    if (typeof input.available === "boolean") {
      updateData.available = input.available
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestError("Aucune donnée à mettre à jour")
    }

    const [updated] = await this.db
      .update(transporters)
      .set(updateData)
      .where(eq(transporters.transporterID, transporterId))
      .returning()

    if (!updated) {
      throw new NotFoundError("Transporteur introuvable")
    }

    return updated
  }

  async delete(transporterId: string): Promise<void> {
    try {
      const [deleted] = await this.db
        .delete(transporters)
        .where(eq(transporters.transporterID, transporterId))
        .returning()

      if (!deleted) {
        throw new NotFoundError("Transporteur introuvable")
      }
    } catch (err) {
      if (err && typeof err === "object" && "code" in err && err.code === "23503") {
        throw new ConflictError("Impossible de supprimer le transporteur car il est utilisé")
      }
      throw err
    }
  }
}
