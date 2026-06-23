import { relations, sql } from "drizzle-orm"
import {
  boolean,
  date,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  smallint,
  text,
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
    nomenclatureCode: varchar("nomenclature_code", { length: 10 }),
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
    nomenclatureCode: varchar("nomenclature_code", { length: 10 }),
    tvaOverride: decimal("tva_override", { precision: 6, scale: 4 }),
    omOverride: decimal("om_override", { precision: 6, scale: 4 }),
    omrOverride: decimal("omr_override", { precision: 6, scale: 4 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_categoryID_idx").on(table.categoryID),
    index("products_originID_idx").on(table.originID),
    index("products_territoryID_idx").on(table.territoryID),
    index("products_nomenclatureCode_idx").on(table.nomenclatureCode),
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

export const customsNomenclatures = pgTable(
  "customs_nomenclatures",
  {
    code: varchar("code", { length: 10 }).primaryKey(),
    parentCode: varchar("parent_code", { length: 10 }),
    description: text("description").notNull(),
    alinea: smallint("alinea").notNull(),
    type: smallint("type").notNull(),
    chapter: smallint("chapter").notNull(),
    validAt: date("valid_at").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("customs_nomenclatures_parentCode_idx").on(table.parentCode),
    index("customs_nomenclatures_chapter_idx").on(table.chapter),
  ],
)

export const ritaSyncRuns = pgTable("rita_sync_runs", {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  chapter: smallint("chapter"),
  rowsImported: integer("rows_imported"),
  status: varchar("status", { length: 20 }).notNull().default("running"),
  errorMessage: text("error_message"),
})

export const transporterFlowNodes = pgTable(
  "transporter_flow_nodes",
  {
    nodeID: uuid("node_id").primaryKey().default(sql`uuidv7()`),
    transporterID: uuid("transporter_id")
      .notNull()
      .references(() => transporters.transporterID, { onDelete: "cascade", onUpdate: "cascade" }),
    nodeType: varchar("node_type", { length: 20 }).notNull(),
    positionX: integer("position_x").notNull(),
    positionY: integer("position_y").notNull(),
    nodeData: jsonb("node_data").notNull().default({}),
  },
  (table) => [index("flow_nodes_transporterID_idx").on(table.transporterID)],
)

export const transporterFlowEdges = pgTable(
  "transporter_flow_edges",
  {
    edgeID: uuid("edge_id").primaryKey().default(sql`uuidv7()`),
    transporterID: uuid("transporter_id")
      .notNull()
      .references(() => transporters.transporterID, { onDelete: "cascade", onUpdate: "cascade" }),
    sourceNodeID: uuid("source_node_id")
      .notNull()
      .references(() => transporterFlowNodes.nodeID, { onDelete: "cascade", onUpdate: "cascade" }),
    targetNodeID: uuid("target_node_id")
      .notNull()
      .references(() => transporterFlowNodes.nodeID, { onDelete: "cascade", onUpdate: "cascade" }),
    sourceHandle: varchar("source_handle", { length: 10 }),
    edgeLabel: varchar("edge_label"),
  },
  (table) => [index("flow_edges_transporterID_idx").on(table.transporterID)],
)

export const transporterFeeRules = pgTable(
  "transporter_fee_rules",
  {
    ruleID: uuid("rule_id").primaryKey().default(sql`uuidv7()`),
    transporterID: uuid("transporter_id")
      .notNull()
      .references(() => transporters.transporterID, { onDelete: "cascade", onUpdate: "cascade" }),
    minAmount: decimal("min_amount", { precision: 12, scale: 2 }),
    maxAmount: decimal("max_amount", { precision: 12, scale: 2 }),
    isIndividual: boolean("is_individual"),
    originIsEU: boolean("origin_is_eu"),
    fee: decimal("fee", { precision: 12, scale: 2 }).notNull(),
    priority: integer("priority").notNull().default(0),
  },
  (table) => [index("fee_rules_transporterID_idx").on(table.transporterID)],
)

export const TransportersRelations = relations(transporters, ({ many }) => ({
  flowNodes: many(transporterFlowNodes),
  flowEdges: many(transporterFlowEdges),
  feeRules: many(transporterFeeRules),
}))

export const TransporterFlowNodesRelations = relations(transporterFlowNodes, ({ one }) => ({
  transporter: one(transporters, {
    fields: [transporterFlowNodes.transporterID],
    references: [transporters.transporterID],
  }),
}))

export const TransporterFlowEdgesRelations = relations(transporterFlowEdges, ({ one }) => ({
  transporter: one(transporters, {
    fields: [transporterFlowEdges.transporterID],
    references: [transporters.transporterID],
  }),
}))

export const TransporterFeeRulesRelations = relations(transporterFeeRules, ({ one }) => ({
  transporter: one(transporters, {
    fields: [transporterFeeRules.transporterID],
    references: [transporters.transporterID],
  }),
}))
