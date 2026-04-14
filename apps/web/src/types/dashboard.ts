export interface RecentProduct {
  productID: string
  productName: string
  createdAt: Date
  category: {
    categoryID: string
    categoryName: string
  }
  origin: {
    originID: string
    originName: string
  }
  territory: {
    territoryID: string
    territoryName: string
  }
}

export interface CategoryDistribution {
  categoryID: string
  categoryName: string
  count: number
}

export interface TopOrigin {
  originID: string
  originName: string
  productsCount: number
  isEU: boolean
}

export interface TopTerritory {
  territoryID: string
  territoryName: string
  productsCount: number
}

export interface DashboardStats {
  products_count: number
  categories_count: number
  origins_count: number
  territories_count: number
}

export interface CategoryWithStats {
  categoryID: string
  categoryName: string
  productCount: number
  taxes: {
    tva: number
    om: number
    omr: number
  }
}
