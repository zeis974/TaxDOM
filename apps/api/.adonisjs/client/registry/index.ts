/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'origins.list': {
    methods: ["GET","HEAD"],
    pattern: '/v1/public/origins',
    tokens: [[0,"v1"],[0,"public"],[0,"origins"]],
    types: placeholder as Registry['origins.list']['types'],
  },
  'search_products': {
    methods: ["GET","HEAD"],
    pattern: '/v1/public/products/search',
    tokens: [[0,"v1"],[0,"public"],[0,"products"],[0,"search"]],
    types: placeholder as Registry['search_products']['types'],
  },
  'get_product_taxes': {
    methods: ["POST"],
    pattern: '/v1/public/products/taxes',
    tokens: [[0,"v1"],[0,"public"],[0,"products"],[0,"taxes"]],
    types: placeholder as Registry['get_product_taxes']['types'],
  },
  'resolve_product_taxes': {
    methods: ["POST"],
    pattern: '/v1/public/products/resolve',
    tokens: [[0,"v1"],[0,"public"],[0,"products"],[0,"resolve"]],
    types: placeholder as Registry['resolve_product_taxes']['types'],
  },
  'scrape_product_url': {
    methods: ["POST"],
    pattern: '/v1/public/products/scrape',
    tokens: [[0,"v1"],[0,"public"],[0,"products"],[0,"scrape"]],
    types: placeholder as Registry['scrape_product_url']['types'],
  },
  'calculate_parcel': {
    methods: ["POST"],
    pattern: '/v1/public/simulator/parcel',
    tokens: [[0,"v1"],[0,"public"],[0,"simulator"],[0,"parcel"]],
    types: placeholder as Registry['calculate_parcel']['types'],
  },
  'get_templates': {
    methods: ["GET","HEAD"],
    pattern: '/v1/public/simulator/templates',
    tokens: [[0,"v1"],[0,"public"],[0,"simulator"],[0,"templates"]],
    types: placeholder as Registry['get_templates']['types'],
  },
  'territories.list': {
    methods: ["GET","HEAD"],
    pattern: '/v1/public/territories',
    tokens: [[0,"v1"],[0,"public"],[0,"territories"]],
    types: placeholder as Registry['territories.list']['types'],
  },
  'transporters.list': {
    methods: ["GET","HEAD"],
    pattern: '/v1/public/transporters',
    tokens: [[0,"v1"],[0,"public"],[0,"transporters"]],
    types: placeholder as Registry['transporters.list']['types'],
  },
  'categories.count': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/categories/count',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"],[0,"count"]],
    types: placeholder as Registry['categories.count']['types'],
  },
  'categories.with_stats': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/categories/stats',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"],[0,"stats"]],
    types: placeholder as Registry['categories.with_stats']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/categories',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"]],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/v1/admin/categories',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"]],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/categories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"],[1,"id"]],
    types: placeholder as Registry['categories.show']['types'],
  },
  'categories.update': {
    methods: ["PUT","PATCH"],
    pattern: '/v1/admin/categories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"],[1,"id"]],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/admin/categories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"categories"],[1,"id"]],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'customs_nomenclatures.chapters': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/chapters',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"chapters"]],
    types: placeholder as Registry['customs_nomenclatures.chapters']['types'],
  },
  'customs_nomenclatures.tree': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/tree',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"tree"]],
    types: placeholder as Registry['customs_nomenclatures.tree']['types'],
  },
  'customs_nomenclatures.search': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/search',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"search"]],
    types: placeholder as Registry['customs_nomenclatures.search']['types'],
  },
  'customs_nomenclatures.products': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/:code/products',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[1,"code"],[0,"products"]],
    types: placeholder as Registry['customs_nomenclatures.products']['types'],
  },
  'customs_nomenclatures.last_sync': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/sync/last',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"sync"],[0,"last"]],
    types: placeholder as Registry['customs_nomenclatures.last_sync']['types'],
  },
  'customs_nomenclatures.trigger_sync': {
    methods: ["POST"],
    pattern: '/v1/admin/customs-nomenclatures/sync',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"sync"]],
    types: placeholder as Registry['customs_nomenclatures.trigger_sync']['types'],
  },
  'customs_nomenclatures.sync_stream': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/customs-nomenclatures/sync/:runId/stream',
    tokens: [[0,"v1"],[0,"admin"],[0,"customs-nomenclatures"],[0,"sync"],[1,"runId"],[0,"stream"]],
    types: placeholder as Registry['customs_nomenclatures.sync_stream']['types'],
  },
  'origins.count': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/origins/count',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"],[0,"count"]],
    types: placeholder as Registry['origins.count']['types'],
  },
  'origins.top': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/origins/top',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"],[0,"top"]],
    types: placeholder as Registry['origins.top']['types'],
  },
  'origins.index': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/origins',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"]],
    types: placeholder as Registry['origins.index']['types'],
  },
  'origins.store': {
    methods: ["POST"],
    pattern: '/v1/admin/origins',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"]],
    types: placeholder as Registry['origins.store']['types'],
  },
  'origins.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/origins/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"],[1,"id"]],
    types: placeholder as Registry['origins.show']['types'],
  },
  'origins.update': {
    methods: ["PUT","PATCH"],
    pattern: '/v1/admin/origins/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"],[1,"id"]],
    types: placeholder as Registry['origins.update']['types'],
  },
  'origins.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/admin/origins/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"origins"],[1,"id"]],
    types: placeholder as Registry['origins.destroy']['types'],
  },
  'products.count': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/products/count',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[0,"count"]],
    types: placeholder as Registry['products.count']['types'],
  },
  'products.recent': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/products/recent',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[0,"recent"]],
    types: placeholder as Registry['products.recent']['types'],
  },
  'products.distribution': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/products/distribution',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[0,"distribution"]],
    types: placeholder as Registry['products.distribution']['types'],
  },
  'products.index': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/products',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"]],
    types: placeholder as Registry['products.index']['types'],
  },
  'products.store': {
    methods: ["POST"],
    pattern: '/v1/admin/products',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"]],
    types: placeholder as Registry['products.store']['types'],
  },
  'products.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/products/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[1,"id"]],
    types: placeholder as Registry['products.show']['types'],
  },
  'products.update': {
    methods: ["PUT","PATCH"],
    pattern: '/v1/admin/products/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[1,"id"]],
    types: placeholder as Registry['products.update']['types'],
  },
  'products.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/admin/products/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"products"],[1,"id"]],
    types: placeholder as Registry['products.destroy']['types'],
  },
  'territories.count': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/territories/count',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"],[0,"count"]],
    types: placeholder as Registry['territories.count']['types'],
  },
  'territories.top': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/territories/top',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"],[0,"top"]],
    types: placeholder as Registry['territories.top']['types'],
  },
  'territories.index': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/territories',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"]],
    types: placeholder as Registry['territories.index']['types'],
  },
  'territories.store': {
    methods: ["POST"],
    pattern: '/v1/admin/territories',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"]],
    types: placeholder as Registry['territories.store']['types'],
  },
  'territories.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/territories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"],[1,"id"]],
    types: placeholder as Registry['territories.show']['types'],
  },
  'territories.update': {
    methods: ["PUT","PATCH"],
    pattern: '/v1/admin/territories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"],[1,"id"]],
    types: placeholder as Registry['territories.update']['types'],
  },
  'territories.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/admin/territories/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"territories"],[1,"id"]],
    types: placeholder as Registry['territories.destroy']['types'],
  },
  'transporters.count': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/transporters/count',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[0,"count"]],
    types: placeholder as Registry['transporters.count']['types'],
  },
  'transporters.index': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/transporters',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"]],
    types: placeholder as Registry['transporters.index']['types'],
  },
  'transporters.store': {
    methods: ["POST"],
    pattern: '/v1/admin/transporters',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"]],
    types: placeholder as Registry['transporters.store']['types'],
  },
  'transporters.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/transporters/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"id"]],
    types: placeholder as Registry['transporters.show']['types'],
  },
  'transporters.update': {
    methods: ["PUT","PATCH"],
    pattern: '/v1/admin/transporters/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"id"]],
    types: placeholder as Registry['transporters.update']['types'],
  },
  'transporters.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/admin/transporters/:id',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"id"]],
    types: placeholder as Registry['transporters.destroy']['types'],
  },
  'transporter_rules.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/admin/transporters/:transporterId/rules',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"transporterId"],[0,"rules"]],
    types: placeholder as Registry['transporter_rules.show']['types'],
  },
  'transporter_rules.save_flow': {
    methods: ["POST"],
    pattern: '/v1/admin/transporters/:transporterId/rules/flow',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"transporterId"],[0,"rules"],[0,"flow"]],
    types: placeholder as Registry['transporter_rules.save_flow']['types'],
  },
  'transporter_rules.save_rules': {
    methods: ["POST"],
    pattern: '/v1/admin/transporters/:transporterId/rules/fees',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"transporterId"],[0,"rules"],[0,"fees"]],
    types: placeholder as Registry['transporter_rules.save_rules']['types'],
  },
  'transporter_rules.save_all': {
    methods: ["POST"],
    pattern: '/v1/admin/transporters/:transporterId/rules',
    tokens: [[0,"v1"],[0,"admin"],[0,"transporters"],[1,"transporterId"],[0,"rules"]],
    types: placeholder as Registry['transporter_rules.save_all']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
