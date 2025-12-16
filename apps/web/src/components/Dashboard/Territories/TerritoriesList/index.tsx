"use client"

import { useMemo } from "react"
import type { Territory } from "@taxdom/types"

import TerritoryCard from "@/components/Dashboard/Territories/TerritoryCard"

import {
  Container,
  NoTerritories,
  TerritoriesContainer,
  ResultsCount,
} from "./TerritoriesList.styled"

interface TerritoriesListProps {
  territories: Territory[]
  filters: TerritoryFilterState
}

export type TerritoryFilterState = {
  search: string
  availability: "all" | "available" | "unavailable"
}

export default function TerritoriesList({ territories, filters }: TerritoriesListProps) {
  // Client-side filtering logic
  const filteredTerritories = useMemo(() => {
    return territories.filter((territory) => {
      // Filter by search (case-insensitive search on territoryName)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!territory.territoryName.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Filter by availability
      if (filters.availability !== "all") {
        const isAvailable = filters.availability === "available"
        if (territory.available !== isAvailable) {
          return false
        }
      }

      return true
    })
  }, [territories, filters])

  const hasActiveFilters = filters.search !== "" || filters.availability !== "all"

  const emptyMessage =
    territories.length === 0
      ? "Aucun territoire trouvé"
      : hasActiveFilters
        ? "Aucun territoire ne correspond aux filtres sélectionnés"
        : "Aucun territoire trouvé"

  // État vide avec icône et message
  const renderEmptyState = () => {
    if (territories.length === 0) {
      return (
        <NoTerritories>
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
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
          <h3>Aucun territoire disponible</h3>
        </NoTerritories>
      )
    }

    if (hasActiveFilters) {
      return (
        <NoTerritories>
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
            Aucun territoire ne correspond aux filtres sélectionnés. Essayez de modifier vos
            critères de recherche.
          </p>
        </NoTerritories>
      )
    }

    return (
      <NoTerritories>
        <span>{emptyMessage}</span>
      </NoTerritories>
    )
  }

  return (
    <Container>
      {/* Results count */}
      {hasActiveFilters && filteredTerritories.length > 0 && (
        <ResultsCount>
          {filteredTerritories.length} résultat{filteredTerritories.length !== 1 ? "s" : ""} sur{" "}
          {territories.length} territoire{territories.length !== 1 ? "s" : ""}
        </ResultsCount>
      )}

      {/* Territories list */}
      {filteredTerritories.length === 0 ? (
        renderEmptyState()
      ) : (
        <TerritoriesContainer>
          {filteredTerritories.map((territory: Territory) => (
            <div key={territory.territoryID}>
              <TerritoryCard territory={territory} editable />
            </div>
          ))}
        </TerritoriesContainer>
      )}
    </Container>
  )
}
