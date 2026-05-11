import "@adonisjs/core/types/http"

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    "origins.list": { paramsTuple?: []; params?: {} }
    search_products: { paramsTuple?: []; params?: {} }
    get_product_taxes: { paramsTuple?: []; params?: {} }
    calculate_parcel: { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "territories.list": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.store": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.store": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.store": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "search_config.get_config": { paramsTuple?: []; params?: {} }
    "search_config.update_config": { paramsTuple?: []; params?: {} }
    "search_config.get_synonyms": { paramsTuple?: []; params?: {} }
    "search_config.update_synonyms": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.store": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.store": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
  GET: {
    "origins.list": { paramsTuple?: []; params?: {} }
    search_products: { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "territories.list": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "search_config.get_config": { paramsTuple?: []; params?: {} }
    "search_config.get_synonyms": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
  HEAD: {
    "origins.list": { paramsTuple?: []; params?: {} }
    search_products: { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "territories.list": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "search_config.get_config": { paramsTuple?: []; params?: {} }
    "search_config.get_synonyms": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
  POST: {
    get_product_taxes: { paramsTuple?: []; params?: {} }
    calculate_parcel: { paramsTuple?: []; params?: {} }
    "categories.store": { paramsTuple?: []; params?: {} }
    "origins.store": { paramsTuple?: []; params?: {} }
    "products.store": { paramsTuple?: []; params?: {} }
    "territories.store": { paramsTuple?: []; params?: {} }
    "transporters.store": { paramsTuple?: []; params?: {} }
  }
  PUT: {
    "categories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "search_config.update_config": { paramsTuple?: []; params?: {} }
    "search_config.update_synonyms": { paramsTuple?: []; params?: {} }
    "territories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
  PATCH: {
    "categories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
  DELETE: {
    "categories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
  }
}
declare module "@adonisjs/core/types/http" {
  export interface RoutesList extends ScannedRoutes {}
}
