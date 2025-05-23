import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"

export const categories = sqliteTable("categories", {
  categoryID: integer("category_id").notNull().primaryKey({ autoIncrement: true }),
  categoryName: text("category_name").notNull(),
  taxID: integer("tax_id").references(() => taxes.taxID),
})

export const flux = sqliteTable("flux", {
  fluxID: integer("flux_id").primaryKey(),
  fluxName: text("flux_name").notNull(),
})

export const origins = sqliteTable("origins", {
  originID: integer("origin_id").primaryKey(),
  originName: text("origin_name").notNull(),
})

export const taxes = sqliteTable("taxes", {
  taxID: integer("tax_id").primaryKey({ autoIncrement: true }),
  tva: integer("tva").notNull(),
  om: integer("om").notNull(),
  omr: integer("omr").notNull(),
})

export const territories = sqliteTable("territories", {
  territoryID: integer("territory_id").primaryKey(),
  territoryName: text("territory_name").notNull(),
})

export const products = sqliteTable("products", {
  productID: integer("product_id").primaryKey({ autoIncrement: true }).notNull(),
  productName: text("product_name").notNull(),
  category: integer("category")
    .notNull()
    .references(() => categories.categoryID),
  originID: integer("origin_id")
    .notNull()
    .references(() => origins.originID),
  territoryID: integer("territory_id")
    .notNull()
    .references(() => territories.territoryID),
  fluxID: integer("flux_id")
    .notNull()
    .references(() => flux.fluxID),
  taxID: integer("tax_id")
    .notNull()
    .references(() => taxes.taxID),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updateAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
})

export const templates = sqliteTable("templates", {
  templateID: integer("template_id").primaryKey({ autoIncrement: true }),
  templateName: text("template_name").notNull(),
})

export const templateProducts = sqliteTable("template_products", {
  templateID: integer("template_id")
    .notNull()
    .references(() => templates.templateID),
  productID: integer("product_id")
    .notNull()
    .references(() => products.productID),
})

export const ProductsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.category],
    references: [categories.categoryID],
  }),
  origin: one(origins, {
    fields: [products.originID],
    references: [origins.originID],
  }),
  territory: one(territories, {
    fields: [products.territoryID],
    references: [territories.territoryID],
  }),
  flux: one(flux, {
    fields: [products.fluxID],
    references: [flux.fluxID],
  }),
  tax: one(taxes, {
    fields: [products.taxID],
    references: [taxes.taxID],
  }),
  templates: many(templateProducts),
}))

export const TemplateRelations = relations(templates, ({ many }) => ({
  products: many(templateProducts),
}))

export const TemplateProductRelations = relations(templateProducts, ({ one }) => ({
  template: one(templates, {
    fields: [templateProducts.templateID],
    references: [templates.templateID],
  }),
  product: one(products, {
    fields: [templateProducts.productID],
    references: [products.productID],
  }),
}))
