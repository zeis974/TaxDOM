import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const categories = pgTable(
  "categories",
  {
    categoryID: varchar("category_id").notNull().primaryKey(),
    categoryName: varchar("category_name").notNull(),
    taxID: varchar("tax_id")
      .references(() => taxes.taxID)
      .notNull(),
  },
  (table) => [index("categories_taxID_idx").on(table.taxID)],
)

export const flux = pgTable("flux", {
  fluxID: varchar("flux_id").notNull().primaryKey(),
  fluxName: varchar("flux_name").notNull(),
})

export const origins = pgTable("origins", {
  originID: varchar("origin_id").notNull().primaryKey(),
  originName: varchar("origin_name").notNull().unique(),
  available: boolean("available").notNull().default(true),
  isEU: boolean("is_eu").notNull().default(false),
})

export const taxes = pgTable("taxes", {
  taxID: varchar("tax_id").notNull().primaryKey(),
  tva: integer("tva").notNull(),
  om: integer("om").notNull(),
  omr: integer("omr").notNull(),
})

export const territories = pgTable("territories", {
  territoryID: varchar("territory_id").notNull().primaryKey(),
  territoryName: varchar("territory_name").notNull(),
  available: boolean("available").notNull().default(true),
})

export const transporters = pgTable("transporters", {
  transporterID: varchar("transporter_id").notNull().primaryKey(),
  transporterName: varchar("transporter_name").notNull(),
  available: boolean("available").notNull().default(true),
})

export const products = pgTable(
  "products",
  {
    productID: varchar("product_id").notNull().primaryKey(),
    productName: varchar("product_name").notNull(),
    categoryID: varchar("category_id")
      .notNull()
      .references(() => categories.categoryID),
    originID: varchar("origin_id")
      .notNull()
      .references(() => origins.originID),
    territoryID: varchar("territory_id")
      .notNull()
      .references(() => territories.territoryID),
    fluxID: varchar("flux_id")
      .notNull()
      .references(() => flux.fluxID),
    taxID: varchar("tax_id")
      .notNull()
      .references(() => taxes.taxID),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_categoryID_idx").on(table.categoryID),
    index("products_originID_idx").on(table.originID),
    index("products_territoryID_idx").on(table.territoryID),
    index("products_fluxID_idx").on(table.fluxID),
    index("products_taxID_idx").on(table.taxID),
  ],
)

export const templates = pgTable("templates", {
  templateID: varchar("template_id").notNull().primaryKey(),
  templateName: varchar("template_name").notNull(),
})

export const templateProducts = pgTable(
  "template_products",
  {
    templateID: varchar("template_id")
      .notNull()
      .references(() => templates.templateID),
    productID: varchar("product_id")
      .notNull()
      .references(() => products.productID),
  },
  (table) => [primaryKey({ columns: [table.templateID, table.productID] })],
)

export const CategoriesRelations = relations(categories, ({ one, many }) => ({
  taxes: one(taxes, {
    fields: [categories.taxID],
    references: [taxes.taxID],
  }),
  products: many(products),
}))

export const FluxRelations = relations(flux, ({ many }) => ({
  products: many(products),
}))

export const OriginsRelations = relations(origins, ({ many }) => ({
  products: many(products),
}))

export const TaxesRelations = relations(taxes, ({ many }) => ({
  categories: many(categories),
  products: many(products),
}))

export const TerritoriesRelations = relations(territories, ({ many }) => ({
  products: many(products),
}))

export const ProductsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryID],
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
  templateProducts: many(templateProducts),
}))

export const TemplatesRelations = relations(templates, ({ many }) => ({
  templateProducts: many(templateProducts),
}))

export const TemplateProductsRelations = relations(templateProducts, ({ one }) => ({
  template: one(templates, {
    fields: [templateProducts.templateID],
    references: [templates.templateID],
  }),
  product: one(products, {
    fields: [templateProducts.productID],
    references: [products.productID],
  }),
}))
