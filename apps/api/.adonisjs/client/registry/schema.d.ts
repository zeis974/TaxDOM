/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type {
  ExtractBody,
  ExtractErrorResponse,
  ExtractQuery,
  ExtractQueryForGet,
  ExtractResponse,
} from "@tuyau/core/types"
import type { InferInput, SimpleError } from "@vinejs/vine/types"

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  "origins.list": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/public/origins"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["list"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["list"]>>
      >
    }
  }
  search_products: {
    methods: ["GET", "HEAD"]
    pattern: "/v1/public/products/search"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<
        InferInput<typeof import("#validators/SearchProductsValidator").SearchProductsValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/SearchProductsController").default["handle"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/SearchProductsController").default["handle"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  get_product_taxes: {
    methods: ["POST"]
    pattern: "/v1/public/products/taxes"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/GetProductTaxeValidator").GetProductTaxeValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/GetProductTaxeValidator").GetProductTaxeValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/GetProductTaxesController").default["handle"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/GetProductTaxesController").default["handle"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  calculate_parcel: {
    methods: ["POST"]
    pattern: "/v1/public/simulator/parcel"
    types: {
      body: ExtractBody<
        InferInput<
          typeof import("#validators/CalculateParcelTaxeValidator").CalculateParcelTaxeValidator
        >
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<
          typeof import("#validators/CalculateParcelTaxeValidator").CalculateParcelTaxeValidator
        >
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CalculateParcelController").default["handle"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/CalculateParcelController").default["handle"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  get_templates: {
    methods: ["GET", "HEAD"]
    pattern: "/v1/public/simulator/templates"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/GetTemplatesController").default["handle"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/GetTemplatesController").default["handle"]>>
      >
    }
  }
  "territories.list": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/public/territories"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["list"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["list"]>>
      >
    }
  }
  "transporters.list": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/public/transporters"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["list"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["list"]>>
      >
    }
  }
  "categories.count": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/categories/count"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["count"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["count"]>>
      >
    }
  }
  "categories.with_stats": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/categories/stats"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["withStats"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["withStats"]>>
      >
    }
  }
  "categories.index": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/categories"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["index"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["index"]>>
      >
    }
  }
  "categories.store": {
    methods: ["POST"]
    pattern: "/v1/admin/categories"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/CategoryValidator").CreateCategoryValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/CategoryValidator").CreateCategoryValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["store"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/CategoriesController").default["store"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "categories.show": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/categories/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["show"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["show"]>>
      >
    }
  }
  "categories.update": {
    methods: ["PUT", "PATCH"]
    pattern: "/v1/admin/categories/:id"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/CategoryValidator").UpdateCategoryValidator>
      >
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<
        InferInput<typeof import("#validators/CategoryValidator").UpdateCategoryValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["update"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/CategoriesController").default["update"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "categories.destroy": {
    methods: ["DELETE"]
    pattern: "/v1/admin/categories/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["destroy"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/CategoriesController").default["destroy"]>>
      >
    }
  }
  "origins.count": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/origins/count"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["count"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["count"]>>
      >
    }
  }
  "origins.top": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/origins/top"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["top"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["top"]>>
      >
    }
  }
  "origins.index": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/origins"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["index"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["index"]>>
      >
    }
  }
  "origins.store": {
    methods: ["POST"]
    pattern: "/v1/admin/origins"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/OriginValidator").createOriginValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/OriginValidator").createOriginValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["store"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/OriginsController").default["store"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "origins.show": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/origins/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["show"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["show"]>>
      >
    }
  }
  "origins.update": {
    methods: ["PUT", "PATCH"]
    pattern: "/v1/admin/origins/:id"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/OriginValidator").updateOriginValidator>
      >
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<
        InferInput<typeof import("#validators/OriginValidator").updateOriginValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["update"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/OriginsController").default["update"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "origins.destroy": {
    methods: ["DELETE"]
    pattern: "/v1/admin/origins/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["destroy"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/OriginsController").default["destroy"]>>
      >
    }
  }
  "products.count": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/count"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["count"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["count"]>>
      >
    }
  }
  "products.recent": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/recent"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["recent"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["recent"]>>
      >
    }
  }
  "products.distribution": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/distribution"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["distribution"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["distribution"]>>
      >
    }
  }
  "products.list_taxes": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/taxes"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["listTaxes"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["listTaxes"]>>
      >
    }
  }
  "products.index": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["index"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["index"]>>
      >
    }
  }
  "products.store": {
    methods: ["POST"]
    pattern: "/v1/admin/products"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/CreateProductValidator").CreateProductValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/CreateProductValidator").CreateProductValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["store"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/ProductsController").default["store"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "products.show": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["show"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["show"]>>
      >
    }
  }
  "products.update": {
    methods: ["PUT", "PATCH"]
    pattern: "/v1/admin/products/:id"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/CreateProductValidator").UpdateProductValidator>
      >
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<
        InferInput<typeof import("#validators/CreateProductValidator").UpdateProductValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["update"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/ProductsController").default["update"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "products.destroy": {
    methods: ["DELETE"]
    pattern: "/v1/admin/products/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["destroy"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/ProductsController").default["destroy"]>>
      >
    }
  }
  "search_config.get_config": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/search-config"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  "search_config.update_config": {
    methods: ["PUT"]
    pattern: "/v1/admin/products/search-config"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  "search_config.get_synonyms": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/products/synonyms"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  "search_config.update_synonyms": {
    methods: ["PUT"]
    pattern: "/v1/admin/products/synonyms"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  "territories.count": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/territories/count"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["count"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["count"]>>
      >
    }
  }
  "territories.top": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/territories/top"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["top"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["top"]>>
      >
    }
  }
  "territories.index": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/territories"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["index"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["index"]>>
      >
    }
  }
  "territories.store": {
    methods: ["POST"]
    pattern: "/v1/admin/territories"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/TerritoryValidator").createTerritoryValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/TerritoryValidator").createTerritoryValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["store"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/TerritoriesController").default["store"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "territories.show": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/territories/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["show"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["show"]>>
      >
    }
  }
  "territories.update": {
    methods: ["PUT", "PATCH"]
    pattern: "/v1/admin/territories/:id"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/TerritoryValidator").updateTerritoryValidator>
      >
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<
        InferInput<typeof import("#validators/TerritoryValidator").updateTerritoryValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["update"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/TerritoriesController").default["update"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "territories.destroy": {
    methods: ["DELETE"]
    pattern: "/v1/admin/territories/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["destroy"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TerritoriesController").default["destroy"]>>
      >
    }
  }
  "transporters.count": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/transporters/count"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["count"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["count"]>>
      >
    }
  }
  "transporters.index": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/transporters"
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["index"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["index"]>>
      >
    }
  }
  "transporters.store": {
    methods: ["POST"]
    pattern: "/v1/admin/transporters"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/TransporterValidator").CreateTransporterValidator>
      >
      paramsTuple: []
      params: {}
      query: ExtractQuery<
        InferInput<typeof import("#validators/TransporterValidator").CreateTransporterValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["store"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/TransportersController").default["store"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "transporters.show": {
    methods: ["GET", "HEAD"]
    pattern: "/v1/admin/transporters/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["show"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["show"]>>
      >
    }
  }
  "transporters.update": {
    methods: ["PUT", "PATCH"]
    pattern: "/v1/admin/transporters/:id"
    types: {
      body: ExtractBody<
        InferInput<typeof import("#validators/TransporterValidator").UpdateTransporterValidator>
      >
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<
        InferInput<typeof import("#validators/TransporterValidator").UpdateTransporterValidator>
      >
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["update"]>>
      >
      errorResponse:
        | ExtractErrorResponse<
            Awaited<ReturnType<import("#controllers/TransportersController").default["update"]>>
          >
        | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  "transporters.destroy": {
    methods: ["DELETE"]
    pattern: "/v1/admin/transporters/:id"
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["destroy"]>>
      >
      errorResponse: ExtractErrorResponse<
        Awaited<ReturnType<import("#controllers/TransportersController").default["destroy"]>>
      >
    }
  }
}
