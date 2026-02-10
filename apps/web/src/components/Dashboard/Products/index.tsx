"use client"

import type { Product, SelectOption } from "@taxdom/types"
import { useState } from "react"

import AddProduct from "./AddProduct"
import FilterProducts from "./FilterProducts"
import type { ProductFilterState } from "./ProductsList"
import ProductsList from "./ProductsList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Products.styled"

interface ProductsProps {
  products: Product[]
  formData: {
    categories: SelectOption[]
    origins: SelectOption[]
    territories: SelectOption[]
    flux: SelectOption[]
    taxes: { taxID: string; tva: number; om: number; omr: number }[]
  }
}

export default function Products({ products, formData }: ProductsProps) {
  const [filters, setFilters] = useState<ProductFilterState>({
    search: "",
    category: "all",
    origin: "all",
    territory: "all",
  })

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des produits</h2>
          <span>{products.length} produits</span>
        </HeaderTitle>
        <HeaderActions>
          <FilterProducts
            filters={filters}
            onFiltersChange={setFilters}
            categories={formData.categories}
            origins={formData.origins}
            territories={formData.territories}
          />
          <AddProduct formData={formData} />
        </HeaderActions>
      </Header>
      <ProductsList products={products} filters={filters} formData={formData} />
    </Container>
  )
}
