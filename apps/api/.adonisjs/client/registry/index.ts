/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from "@tuyau/core/types"
import type { Registry } from "./schema.d.ts"
import type { ApiDefinition } from "./tree.d.ts"

const placeholder: any = {}

const routes = {
  "origins.list": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/public/origins",
    tokens: [
      { old: "/v1/public/origins", type: 0, val: "v1", end: "" },
      { old: "/v1/public/origins", type: 0, val: "public", end: "" },
      { old: "/v1/public/origins", type: 0, val: "origins", end: "" },
    ],
    types: placeholder as Registry["origins.list"]["types"],
  },
  search_products: {
    methods: ["GET", "HEAD"],
    pattern: "/v1/public/products/search",
    tokens: [
      { old: "/v1/public/products/search", type: 0, val: "v1", end: "" },
      { old: "/v1/public/products/search", type: 0, val: "public", end: "" },
      { old: "/v1/public/products/search", type: 0, val: "products", end: "" },
      { old: "/v1/public/products/search", type: 0, val: "search", end: "" },
    ],
    types: placeholder as Registry["search_products"]["types"],
  },
  get_product_taxes: {
    methods: ["POST"],
    pattern: "/v1/public/products/taxes",
    tokens: [
      { old: "/v1/public/products/taxes", type: 0, val: "v1", end: "" },
      { old: "/v1/public/products/taxes", type: 0, val: "public", end: "" },
      { old: "/v1/public/products/taxes", type: 0, val: "products", end: "" },
      { old: "/v1/public/products/taxes", type: 0, val: "taxes", end: "" },
    ],
    types: placeholder as Registry["get_product_taxes"]["types"],
  },
  calculate_parcel: {
    methods: ["POST"],
    pattern: "/v1/public/simulator/parcel",
    tokens: [
      { old: "/v1/public/simulator/parcel", type: 0, val: "v1", end: "" },
      { old: "/v1/public/simulator/parcel", type: 0, val: "public", end: "" },
      { old: "/v1/public/simulator/parcel", type: 0, val: "simulator", end: "" },
      { old: "/v1/public/simulator/parcel", type: 0, val: "parcel", end: "" },
    ],
    types: placeholder as Registry["calculate_parcel"]["types"],
  },
  get_templates: {
    methods: ["GET", "HEAD"],
    pattern: "/v1/public/simulator/templates",
    tokens: [
      { old: "/v1/public/simulator/templates", type: 0, val: "v1", end: "" },
      { old: "/v1/public/simulator/templates", type: 0, val: "public", end: "" },
      { old: "/v1/public/simulator/templates", type: 0, val: "simulator", end: "" },
      { old: "/v1/public/simulator/templates", type: 0, val: "templates", end: "" },
    ],
    types: placeholder as Registry["get_templates"]["types"],
  },
  "territories.list": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/public/territories",
    tokens: [
      { old: "/v1/public/territories", type: 0, val: "v1", end: "" },
      { old: "/v1/public/territories", type: 0, val: "public", end: "" },
      { old: "/v1/public/territories", type: 0, val: "territories", end: "" },
    ],
    types: placeholder as Registry["territories.list"]["types"],
  },
  "transporters.list": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/public/transporters",
    tokens: [
      { old: "/v1/public/transporters", type: 0, val: "v1", end: "" },
      { old: "/v1/public/transporters", type: 0, val: "public", end: "" },
      { old: "/v1/public/transporters", type: 0, val: "transporters", end: "" },
    ],
    types: placeholder as Registry["transporters.list"]["types"],
  },
  "categories.count": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/categories/count",
    tokens: [
      { old: "/v1/admin/categories/count", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories/count", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories/count", type: 0, val: "categories", end: "" },
      { old: "/v1/admin/categories/count", type: 0, val: "count", end: "" },
    ],
    types: placeholder as Registry["categories.count"]["types"],
  },
  "categories.with_stats": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/categories/stats",
    tokens: [
      { old: "/v1/admin/categories/stats", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories/stats", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories/stats", type: 0, val: "categories", end: "" },
      { old: "/v1/admin/categories/stats", type: 0, val: "stats", end: "" },
    ],
    types: placeholder as Registry["categories.with_stats"]["types"],
  },
  "categories.index": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/categories",
    tokens: [
      { old: "/v1/admin/categories", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories", type: 0, val: "categories", end: "" },
    ],
    types: placeholder as Registry["categories.index"]["types"],
  },
  "categories.store": {
    methods: ["POST"],
    pattern: "/v1/admin/categories",
    tokens: [
      { old: "/v1/admin/categories", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories", type: 0, val: "categories", end: "" },
    ],
    types: placeholder as Registry["categories.store"]["types"],
  },
  "categories.show": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/categories/:id",
    tokens: [
      { old: "/v1/admin/categories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "categories", end: "" },
      { old: "/v1/admin/categories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["categories.show"]["types"],
  },
  "categories.update": {
    methods: ["PUT", "PATCH"],
    pattern: "/v1/admin/categories/:id",
    tokens: [
      { old: "/v1/admin/categories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "categories", end: "" },
      { old: "/v1/admin/categories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["categories.update"]["types"],
  },
  "categories.destroy": {
    methods: ["DELETE"],
    pattern: "/v1/admin/categories/:id",
    tokens: [
      { old: "/v1/admin/categories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/categories/:id", type: 0, val: "categories", end: "" },
      { old: "/v1/admin/categories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["categories.destroy"]["types"],
  },
  "origins.count": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/origins/count",
    tokens: [
      { old: "/v1/admin/origins/count", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins/count", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins/count", type: 0, val: "origins", end: "" },
      { old: "/v1/admin/origins/count", type: 0, val: "count", end: "" },
    ],
    types: placeholder as Registry["origins.count"]["types"],
  },
  "origins.top": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/origins/top",
    tokens: [
      { old: "/v1/admin/origins/top", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins/top", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins/top", type: 0, val: "origins", end: "" },
      { old: "/v1/admin/origins/top", type: 0, val: "top", end: "" },
    ],
    types: placeholder as Registry["origins.top"]["types"],
  },
  "origins.index": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/origins",
    tokens: [
      { old: "/v1/admin/origins", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins", type: 0, val: "origins", end: "" },
    ],
    types: placeholder as Registry["origins.index"]["types"],
  },
  "origins.store": {
    methods: ["POST"],
    pattern: "/v1/admin/origins",
    tokens: [
      { old: "/v1/admin/origins", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins", type: 0, val: "origins", end: "" },
    ],
    types: placeholder as Registry["origins.store"]["types"],
  },
  "origins.show": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/origins/:id",
    tokens: [
      { old: "/v1/admin/origins/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "origins", end: "" },
      { old: "/v1/admin/origins/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["origins.show"]["types"],
  },
  "origins.update": {
    methods: ["PUT", "PATCH"],
    pattern: "/v1/admin/origins/:id",
    tokens: [
      { old: "/v1/admin/origins/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "origins", end: "" },
      { old: "/v1/admin/origins/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["origins.update"]["types"],
  },
  "origins.destroy": {
    methods: ["DELETE"],
    pattern: "/v1/admin/origins/:id",
    tokens: [
      { old: "/v1/admin/origins/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/origins/:id", type: 0, val: "origins", end: "" },
      { old: "/v1/admin/origins/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["origins.destroy"]["types"],
  },
  "products.count": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/count",
    tokens: [
      { old: "/v1/admin/products/count", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/count", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/count", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/count", type: 0, val: "count", end: "" },
    ],
    types: placeholder as Registry["products.count"]["types"],
  },
  "products.recent": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/recent",
    tokens: [
      { old: "/v1/admin/products/recent", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/recent", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/recent", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/recent", type: 0, val: "recent", end: "" },
    ],
    types: placeholder as Registry["products.recent"]["types"],
  },
  "products.distribution": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/distribution",
    tokens: [
      { old: "/v1/admin/products/distribution", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/distribution", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/distribution", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/distribution", type: 0, val: "distribution", end: "" },
    ],
    types: placeholder as Registry["products.distribution"]["types"],
  },
  "products.list_taxes": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/taxes",
    tokens: [
      { old: "/v1/admin/products/taxes", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/taxes", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/taxes", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/taxes", type: 0, val: "taxes", end: "" },
    ],
    types: placeholder as Registry["products.list_taxes"]["types"],
  },
  "products.index": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products",
    tokens: [
      { old: "/v1/admin/products", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products", type: 0, val: "products", end: "" },
    ],
    types: placeholder as Registry["products.index"]["types"],
  },
  "products.store": {
    methods: ["POST"],
    pattern: "/v1/admin/products",
    tokens: [
      { old: "/v1/admin/products", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products", type: 0, val: "products", end: "" },
    ],
    types: placeholder as Registry["products.store"]["types"],
  },
  "products.show": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/:id",
    tokens: [
      { old: "/v1/admin/products/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["products.show"]["types"],
  },
  "products.update": {
    methods: ["PUT", "PATCH"],
    pattern: "/v1/admin/products/:id",
    tokens: [
      { old: "/v1/admin/products/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["products.update"]["types"],
  },
  "products.destroy": {
    methods: ["DELETE"],
    pattern: "/v1/admin/products/:id",
    tokens: [
      { old: "/v1/admin/products/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/:id", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["products.destroy"]["types"],
  },
  "search_config.get_config": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/search-config",
    tokens: [
      { old: "/v1/admin/products/search-config", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "search-config", end: "" },
    ],
    types: placeholder as Registry["search_config.get_config"]["types"],
  },
  "search_config.update_config": {
    methods: ["PUT"],
    pattern: "/v1/admin/products/search-config",
    tokens: [
      { old: "/v1/admin/products/search-config", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/search-config", type: 0, val: "search-config", end: "" },
    ],
    types: placeholder as Registry["search_config.update_config"]["types"],
  },
  "search_config.get_synonyms": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/products/synonyms",
    tokens: [
      { old: "/v1/admin/products/synonyms", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "synonyms", end: "" },
    ],
    types: placeholder as Registry["search_config.get_synonyms"]["types"],
  },
  "search_config.update_synonyms": {
    methods: ["PUT"],
    pattern: "/v1/admin/products/synonyms",
    tokens: [
      { old: "/v1/admin/products/synonyms", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "products", end: "" },
      { old: "/v1/admin/products/synonyms", type: 0, val: "synonyms", end: "" },
    ],
    types: placeholder as Registry["search_config.update_synonyms"]["types"],
  },
  "territories.count": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/territories/count",
    tokens: [
      { old: "/v1/admin/territories/count", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories/count", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories/count", type: 0, val: "territories", end: "" },
      { old: "/v1/admin/territories/count", type: 0, val: "count", end: "" },
    ],
    types: placeholder as Registry["territories.count"]["types"],
  },
  "territories.top": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/territories/top",
    tokens: [
      { old: "/v1/admin/territories/top", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories/top", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories/top", type: 0, val: "territories", end: "" },
      { old: "/v1/admin/territories/top", type: 0, val: "top", end: "" },
    ],
    types: placeholder as Registry["territories.top"]["types"],
  },
  "territories.index": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/territories",
    tokens: [
      { old: "/v1/admin/territories", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories", type: 0, val: "territories", end: "" },
    ],
    types: placeholder as Registry["territories.index"]["types"],
  },
  "territories.store": {
    methods: ["POST"],
    pattern: "/v1/admin/territories",
    tokens: [
      { old: "/v1/admin/territories", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories", type: 0, val: "territories", end: "" },
    ],
    types: placeholder as Registry["territories.store"]["types"],
  },
  "territories.show": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/territories/:id",
    tokens: [
      { old: "/v1/admin/territories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "territories", end: "" },
      { old: "/v1/admin/territories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["territories.show"]["types"],
  },
  "territories.update": {
    methods: ["PUT", "PATCH"],
    pattern: "/v1/admin/territories/:id",
    tokens: [
      { old: "/v1/admin/territories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "territories", end: "" },
      { old: "/v1/admin/territories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["territories.update"]["types"],
  },
  "territories.destroy": {
    methods: ["DELETE"],
    pattern: "/v1/admin/territories/:id",
    tokens: [
      { old: "/v1/admin/territories/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/territories/:id", type: 0, val: "territories", end: "" },
      { old: "/v1/admin/territories/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["territories.destroy"]["types"],
  },
  "transporters.count": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/transporters/count",
    tokens: [
      { old: "/v1/admin/transporters/count", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters/count", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters/count", type: 0, val: "transporters", end: "" },
      { old: "/v1/admin/transporters/count", type: 0, val: "count", end: "" },
    ],
    types: placeholder as Registry["transporters.count"]["types"],
  },
  "transporters.index": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/transporters",
    tokens: [
      { old: "/v1/admin/transporters", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters", type: 0, val: "transporters", end: "" },
    ],
    types: placeholder as Registry["transporters.index"]["types"],
  },
  "transporters.store": {
    methods: ["POST"],
    pattern: "/v1/admin/transporters",
    tokens: [
      { old: "/v1/admin/transporters", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters", type: 0, val: "transporters", end: "" },
    ],
    types: placeholder as Registry["transporters.store"]["types"],
  },
  "transporters.show": {
    methods: ["GET", "HEAD"],
    pattern: "/v1/admin/transporters/:id",
    tokens: [
      { old: "/v1/admin/transporters/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "transporters", end: "" },
      { old: "/v1/admin/transporters/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["transporters.show"]["types"],
  },
  "transporters.update": {
    methods: ["PUT", "PATCH"],
    pattern: "/v1/admin/transporters/:id",
    tokens: [
      { old: "/v1/admin/transporters/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "transporters", end: "" },
      { old: "/v1/admin/transporters/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["transporters.update"]["types"],
  },
  "transporters.destroy": {
    methods: ["DELETE"],
    pattern: "/v1/admin/transporters/:id",
    tokens: [
      { old: "/v1/admin/transporters/:id", type: 0, val: "v1", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "admin", end: "" },
      { old: "/v1/admin/transporters/:id", type: 0, val: "transporters", end: "" },
      { old: "/v1/admin/transporters/:id", type: 1, val: "id", end: "" },
    ],
    types: placeholder as Registry["transporters.destroy"]["types"],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module "@tuyau/core/types" {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
