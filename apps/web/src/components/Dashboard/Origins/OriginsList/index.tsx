"use client"

import type { Origin } from "@taxdom/types"
import { useMemo } from "react"

import OriginCard from "@/components/Dashboard/Origins/OriginCard"

import { Container, NoOrigins, OriginsContainer } from "./OriginsList.styled"

interface OriginsListProps {
  origins: Origin[]
  filters: OriginFilterState
}

export type OriginFilterState = {
  search: string
  availability: "all" | "available" | "unavailable"
  zone: "all" | "eu" | "non-eu"
}

export default function OriginsList({ origins, filters }: OriginsListProps) {
  const filteredOrigins = useMemo(() => {
    return origins.filter((origin) => {
      // Filter by search (case-insensitive search on originName)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!origin.name.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Filter by availability
      if (filters.availability !== "all") {
        const isAvailable = filters.availability === "available"
        if (origin.available !== isAvailable) {
          return false
        }
      }

      // Filter by zone (EU/non-EU)
      if (filters.zone !== "all") {
        const isEU = filters.zone === "eu"
        if (origin.isEU !== isEU) {
          return false
        }
      }

      return true
    })
  }, [origins, filters])

  const hasActiveFilters =
    filters.search !== "" || filters.availability !== "all" || filters.zone !== "all"

  const emptyMessage =
    origins.length === 0
      ? "Aucune origine trouvée"
      : hasActiveFilters
        ? "Aucune origine ne correspond aux filtres sélectionnés"
        : "Aucune origine trouvée"

  return (
    <Container>
      {/* Origins list */}
      {filteredOrigins.length === 0 ? (
        <NoOrigins>
          <span>{emptyMessage}</span>
        </NoOrigins>
      ) : (
        <OriginsContainer>
          {filteredOrigins.map((origin: Origin) => (
            <div key={origin.originID}>
              <OriginCard origin={origin} editable />
            </div>
          ))}
        </OriginsContainer>
      )}
    </Container>
  )
}
