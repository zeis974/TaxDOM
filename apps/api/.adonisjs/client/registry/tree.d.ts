/* eslint-disable prettier/prettier */
import type { routes } from "./index.ts"

export interface ApiDefinition {
  origins: {
    list: (typeof routes)["origins.list"]
    count: (typeof routes)["origins.count"]
    top: (typeof routes)["origins.top"]
    index: (typeof routes)["origins.index"]
    store: (typeof routes)["origins.store"]
    show: (typeof routes)["origins.show"]
    update: (typeof routes)["origins.update"]
    destroy: (typeof routes)["origins.destroy"]
  }
  searchProducts: (typeof routes)["search_products"]
  getProductTaxes: (typeof routes)["get_product_taxes"]
  calculateParcel: (typeof routes)["calculate_parcel"]
  getTemplates: (typeof routes)["get_templates"]
  territories: {
    list: (typeof routes)["territories.list"]
    count: (typeof routes)["territories.count"]
    top: (typeof routes)["territories.top"]
    index: (typeof routes)["territories.index"]
    store: (typeof routes)["territories.store"]
    show: (typeof routes)["territories.show"]
    update: (typeof routes)["territories.update"]
    destroy: (typeof routes)["territories.destroy"]
  }
  transporters: {
    list: (typeof routes)["transporters.list"]
    count: (typeof routes)["transporters.count"]
    index: (typeof routes)["transporters.index"]
    store: (typeof routes)["transporters.store"]
    show: (typeof routes)["transporters.show"]
    update: (typeof routes)["transporters.update"]
    destroy: (typeof routes)["transporters.destroy"]
  }
  categories: {
    count: (typeof routes)["categories.count"]
    withStats: (typeof routes)["categories.with_stats"]
    index: (typeof routes)["categories.index"]
    store: (typeof routes)["categories.store"]
    show: (typeof routes)["categories.show"]
    update: (typeof routes)["categories.update"]
    destroy: (typeof routes)["categories.destroy"]
  }
  products: {
    count: (typeof routes)["products.count"]
    recent: (typeof routes)["products.recent"]
    distribution: (typeof routes)["products.distribution"]
    listTaxes: (typeof routes)["products.list_taxes"]
    index: (typeof routes)["products.index"]
    store: (typeof routes)["products.store"]
    show: (typeof routes)["products.show"]
    update: (typeof routes)["products.update"]
    destroy: (typeof routes)["products.destroy"]
  }
  searchConfig: {
    getConfig: (typeof routes)["search_config.get_config"]
    updateConfig: (typeof routes)["search_config.update_config"]
    getSynonyms: (typeof routes)["search_config.get_synonyms"]
    updateSynonyms: (typeof routes)["search_config.update_synonyms"]
  }
}
