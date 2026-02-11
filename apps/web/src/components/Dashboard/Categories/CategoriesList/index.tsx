"use client"

import { useMemo } from "react"
import type { Category } from "@taxdom/types"

import CategoryCard from "@/components/Dashboard/Categories/CategoryCard"

import { Container, NoCategories, CategoriesContainer, ResultsCount } from "./CategoriesList.styled"

interface CategoriesListProps {
  categories: Category[]
  filters: CategoryFilterState
}

export type CategoryFilterState = {
  search: string
}

export default function CategoriesList({ categories, filters }: CategoriesListProps) {
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!category.categoryName.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      return true
    })
  }, [categories, filters])

  const hasActiveFilters = filters.search !== ""

  const renderEmptyState = () => {
    if (categories.length === 0) {
      return (
        <NoCategories>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <h3>Aucune catégorie disponible</h3>
          <p>Ajoutez votre première catégorie en cliquant sur le bouton ci-dessus.</p>
        </NoCategories>
      )
    }

    if (hasActiveFilters) {
      return (
        <NoCategories>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h3>Aucun résultat</h3>
          <p>
            Aucune catégorie ne correspond aux filtres sélectionnés. Essayez de modifier vos
            critères de recherche.
          </p>
        </NoCategories>
      )
    }

    return (
      <NoCategories>
        <span>Aucune catégorie trouvée</span>
      </NoCategories>
    )
  }

  return (
    <Container>
      {hasActiveFilters && filteredCategories.length > 0 && (
        <ResultsCount>
          {filteredCategories.length} résultat{filteredCategories.length !== 1 ? "s" : ""} sur{" "}
          {categories.length} catégorie{categories.length !== 1 ? "s" : ""}
        </ResultsCount>
      )}

      {filteredCategories.length === 0 ? (
        renderEmptyState()
      ) : (
        <CategoriesContainer>
          {filteredCategories.map((category: Category) => (
            <div key={category.categoryID}>
              <CategoryCard category={category} editable />
            </div>
          ))}
        </CategoriesContainer>
      )}
    </Container>
  )
}
