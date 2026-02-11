"use client"

import type { Category } from "@taxdom/types"
import { useState } from "react"

import AddCategory from "./AddCategory"
import FilterCategories from "./FilterCategories"
import type { CategoryFilterState } from "./CategoriesList"
import CategoriesList from "./CategoriesList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Categories.styled"

interface CategoriesProps {
  categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
  const [filters, setFilters] = useState<CategoryFilterState>({
    search: "",
  })

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des catégories</h2>
          <span>{categories.length} catégories</span>
        </HeaderTitle>
        <HeaderActions>
          <FilterCategories filters={filters} onFiltersChange={setFilters} />
          <AddCategory />
        </HeaderActions>
      </Header>
      <CategoriesList categories={categories} filters={filters} />
    </Container>
  )
}
