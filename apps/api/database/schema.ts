import { relations } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Origins = sqliteTable("origins", {
  originID: integer("origin_id").primaryKey(),
  originName: text("origin_name").notNull(),
})

export const Territory = sqliteTable("territory", {
  territoryID: integer("territory_id").primaryKey(),
  territoryName: text("territory_name").notNull(),
})

export const Flux = sqliteTable("flux", {
  fluxID: integer("flux_id").primaryKey(),
  fluxName: text("flux_name").notNull(),
})

export const Taxes = sqliteTable("taxes", {
  taxID: integer("tax_id").primaryKey({ autoIncrement: true }),
  tva: integer("tva").notNull(),
  om: integer("om").notNull(),
  omr: integer("omr").notNull(),
})

export const ProductsTables = sqliteTable("products", {
  productID: integer("product_id").notNull().primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  originID: integer("origin_id")
    .notNull()
    .references(() => Origins.originID),
  territoryID: integer("territory_id")
    .notNull()
    .references(() => Territory.territoryID),
  fluxID: integer("flux_id")
    .notNull()
    .references(() => Flux.fluxID),
  taxID: integer("tax_id")
    .notNull()
    .references(() => Taxes.taxID),
})

export const ProductsRelations = relations(ProductsTables, ({ one }) => ({
  origin: one(Origins, {
    fields: [ProductsTables.originID],
    references: [Origins.originID],
  }),
  territory: one(Territory, {
    fields: [ProductsTables.territoryID],
    references: [Territory.territoryID],
  }),
  flux: one(Flux, {
    fields: [ProductsTables.fluxID],
    references: [Flux.fluxID],
  }),
  tax: one(Taxes, {
    fields: [ProductsTables.taxID],
    references: [Taxes.taxID],
  }),
}))

export type SelectProducts = typeof ProductsTables.$inferSelect
