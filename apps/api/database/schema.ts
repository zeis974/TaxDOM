import { relations, sql } from "drizzle-orm"
import {
  boolean,
  decimal,
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const categories = pgTable(
  "categories",
  {
    categoryID: uuid("category_id").primaryKey().default(sql`uuidv7()`),
    categoryName: varchar("category_name").notNull().unique(),
    taxID: uuid("tax_id")
      .notNull()
      .references(() => taxes.taxID, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  (table) => [index("categories_taxID_idx").on(table.taxID)],
)

export const origins = pgTable("origins", {
  originID: uuid("origin_id").primaryKey().default(sql`uuidv7()`),
  originName: varchar("origin_name").notNull().unique(),
  available: boolean("available").notNull().default(true),
  isEU: boolean("is_eu").notNull().default(false),
})

export const taxes = pgTable("taxes", {
  taxID: uuid("tax_id").primaryKey().default(sql`uuidv7()`),
  tva: decimal("tva", { precision: 10, scale: 2 }).notNull(),
  om: decimal("om", { precision: 10, scale: 2 }).notNull(),
  omr: decimal("omr", { precision: 10, scale: 2 }).notNull(),
})

export const territories = pgTable("territories", {
  territoryID: uuid("territory_id").primaryKey().default(sql`uuidv7()`),
  territoryName: varchar("territory_name").notNull().unique(),
  available: boolean("available").notNull().default(true),
})

export const transporters = pgTable("transporters", {
  transporterID: uuid("transporter_id").primaryKey().default(sql`uuidv7()`),
  transporterName: varchar("transporter_name").notNull(),
  available: boolean("available").notNull().default(true),
})

export const products = pgTable(
  "products",
  {
    productID: uuid("product_id").primaryKey().default(sql`uuidv7()`),
    productName: varchar("product_name").notNull(),
    categoryID: uuid("category_id")
      .notNull()
      .references(() => categories.categoryID, { onDelete: "restrict", onUpdate: "cascade" }),
    originID: uuid("origin_id")
      .notNull()
      .references(() => origins.originID, { onDelete: "restrict", onUpdate: "cascade" }),
    territoryID: uuid("territory_id")
      .notNull()
      .references(() => territories.territoryID, { onDelete: "restrict", onUpdate: "cascade" }),
    available: boolean("available").notNull().default(true),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_categoryID_idx").on(table.categoryID),
    index("products_originID_idx").on(table.originID),
    index("products_territoryID_idx").on(table.territoryID),
  ],
)

export const templates = pgTable("templates", {
  templateID: uuid("template_id").primaryKey().default(sql`uuidv7()`),
  templateName: varchar("template_name").notNull().unique(),
})

export const templateProducts = pgTable(
  "template_products",
  {
    templateID: uuid("template_id")
      .notNull()
      .references(() => templates.templateID, { onDelete: "cascade", onUpdate: "cascade" }),
    productID: uuid("product_id")
      .notNull()
      .references(() => products.productID, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.templateID, table.productID] })],
)

export const CategoriesRelations = relations(categories, ({ one, many }) => ({
  tax: one(taxes, {
    fields: [categories.taxID],
    references: [taxes.taxID],
  }),
  products: many(products),
}))

export const OriginsRelations = relations(origins, ({ many }) => ({
  products: many(products),
}))

export const TaxesRelations = relations(taxes, ({ many }) => ({
  categories: many(categories),
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
