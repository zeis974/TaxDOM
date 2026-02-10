"use client"

import { useMemo } from "react"
import type { Product, SelectOption } from "@taxdom/types"

import ProductCard from "@/components/Dashboard/Products/ProductCard"

import {
  Container,
  NoProducts,
  ProductContainer,
  ProductHeader,
  ResultsCount,
} from "./ProductsList.styled"

export type ProductFilterState = {
  search: string
  category: "all" | string
  origin: "all" | string
  territory: "all" | string
}

interface ProductsListProps {
  products: Product[]
  filters: ProductFilterState
  formData: {
    categories: SelectOption[]
    origins: SelectOption[]
    territories: SelectOption[]
    flux: SelectOption[]
    taxes: { taxID: string; tva: number; om: number; omr: number }[]
  }
}

export default function ProductsList({ products, filters, formData }: ProductsListProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!product.productName.toLowerCase().includes(searchLower)) return false
      }
      if (filters.category !== "all") {
        if (product.category.categoryID !== filters.category) return false
      }
      if (filters.origin !== "all") {
        if (product.origin.originID !== filters.origin) return false
      }
      if (filters.territory !== "all") {
        if (product.territory.territoryID !== filters.territory) return false
      }
      return true
    })
  }, [products, filters])

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.origin !== "all" ||
    filters.territory !== "all"

  if (products.length === 0) {
    return (
      <NoProducts>
        <h3>Aucun produit disponible</h3>
        <p>Ajoutez votre premier produit en cliquant sur le bouton ci-dessus.</p>
      </NoProducts>
    )
  }

  return (
    <Container>
      {hasActiveFilters && filteredProducts.length > 0 && (
        <ResultsCount>
          {filteredProducts.length} résultat{filteredProducts.length !== 1 ? "s" : ""} sur{" "}
          {products.length} produit{products.length !== 1 ? "s" : ""}
        </ResultsCount>
      )}

      {filteredProducts.length === 0 && hasActiveFilters ? (
        <NoProducts>
          <h3>Aucun résultat</h3>
          <p>
            Aucun produit ne correspond aux filtres sélectionnés. Essayez de modifier vos critères
            de recherche.
          </p>
        </NoProducts>
      ) : (
        <>
          <ProductHeader>
            <span>Nom du produit</span>
            <span>Origine</span>
            <span>Flux</span>
            <span>Territoire</span>
            <span>Taxes</span>
          </ProductHeader>
          <ProductContainer>
            {filteredProducts.map((product) => (
              <ProductCard key={product.productID} product={product} formData={formData} editable />
            ))}
          </ProductContainer>
        </>
      )}
    </Container>
  )
}
