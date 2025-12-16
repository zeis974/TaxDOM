"use client"

import type { Origin } from "@taxdom/types"
import { useOptimistic, useState } from "react"

import AddOrigin from "./AddOrigin"
import FilterOrigins from "./FilterOrigins"
import type { OriginFilterState } from "./OriginsList"
import OriginsList from "./OriginsList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Origins.styled"

interface OriginsProps {
  origins: Origin[]
}

export default function Origins({ origins }: OriginsProps) {
  const [optimisticOrigins, addOptimisticOrigin] = useOptimistic(
    origins,
    (state, newOrigin: Origin) => [newOrigin, ...state],
  )

  const [filters, setFilters] = useState<OriginFilterState>({
    search: "",
    availability: "all",
    zone: "all",
  })

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des origines</h2>
          <span>{optimisticOrigins.length} origines</span>
        </HeaderTitle>
        <HeaderActions>
          <FilterOrigins filters={filters} onFiltersChange={setFilters} />
          <AddOrigin onAddOptimistic={addOptimisticOrigin} />
        </HeaderActions>
      </Header>
      <OriginsList origins={optimisticOrigins} filters={filters} />
    </Container>
  )
}
