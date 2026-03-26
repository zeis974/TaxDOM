import "@adonisjs/core/types/http"

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    search_products: { paramsTuple?: []; params?: {} }
    "origins.list": { paramsTuple?: []; params?: {} }
    calculate_parcel: { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "products.list_flux": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.create": { paramsTuple?: []; params?: {} }
    "categories.store": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.create": { paramsTuple?: []; params?: {} }
    "origins.store": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.create": { paramsTuple?: []; params?: {} }
    "products.store": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.create": { paramsTuple?: []; params?: {} }
    "territories.store": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.create": { paramsTuple?: []; params?: {} }
    "transporters.store": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.destroy": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporter_rules.show": { paramsTuple: [ParamValue]; params: { transporterId: ParamValue } }
    "transporter_rules.save_flow": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
    "transporter_rules.save_rules": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
    "transporter_rules.save_all": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
  }
  GET: {
    search_products: { paramsTuple?: []; params?: {} }
    "origins.list": { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "products.list_flux": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.create": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.create": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.create": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.create": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.create": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporter_rules.show": { paramsTuple: [ParamValue]; params: { transporterId: ParamValue } }
  }
  HEAD: {
    search_products: { paramsTuple?: []; params?: {} }
    "origins.list": { paramsTuple?: []; params?: {} }
    get_templates: { paramsTuple?: []; params?: {} }
    "categories.count": { paramsTuple?: []; params?: {} }
    "categories.with_stats": { paramsTuple?: []; params?: {} }
    "origins.count": { paramsTuple?: []; params?: {} }
    "origins.top": { paramsTuple?: []; params?: {} }
    "products.count": { paramsTuple?: []; params?: {} }
    "products.recent": { paramsTuple?: []; params?: {} }
    "products.distribution": { paramsTuple?: []; params?: {} }
    "territories.count": { paramsTuple?: []; params?: {} }
    "territories.top": { paramsTuple?: []; params?: {} }
    "transporters.count": { paramsTuple?: []; params?: {} }
    "transporters.list": { paramsTuple?: []; params?: {} }
    "products.list_flux": { paramsTuple?: []; params?: {} }
    "products.list_taxes": { paramsTuple?: []; params?: {} }
    "categories.index": { paramsTuple?: []; params?: {} }
    "categories.create": { paramsTuple?: []; params?: {} }
    "categories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "categories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.index": { paramsTuple?: []; params?: {} }
    "origins.create": { paramsTuple?: []; params?: {} }
    "origins.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.index": { paramsTuple?: []; params?: {} }
    "products.create": { paramsTuple?: []; params?: {} }
    "products.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.index": { paramsTuple?: []; params?: {} }
    "territories.create": { paramsTuple?: []; params?: {} }
    "territories.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "territories.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.index": { paramsTuple?: []; params?: {} }
    "transporters.create": { paramsTuple?: []; params?: {} }
    "transporters.show": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporters.edit": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "transporter_rules.show": { paramsTuple: [ParamValue]; params: { transporterId: ParamValue } }
  }
  POST: {
    calculate_parcel: { paramsTuple?: []; params?: {} }
    "categories.store": { paramsTuple?: []; params?: {} }
    "origins.store": { paramsTuple?: []; params?: {} }
    "products.store": { paramsTuple?: []; params?: {} }
    "territories.store": { paramsTuple?: []; params?: {} }
    "transporters.store": { paramsTuple?: []; params?: {} }
    "transporter_rules.save_flow": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
    "transporter_rules.save_rules": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
    "transporter_rules.save_all": {
      paramsTuple: [ParamValue]
      params: { transporterId: ParamValue }
    }
  }
  PUT: {
    "categories.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "origins.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
    "products.update": { paramsTuple: [ParamValue]; params: { id: ParamValue } }
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
