"use client"

import type { Territory } from "@taxdom/types"
import { useState } from "react"

import AddTerritory from "./AddTerritory"
import FilterTerritories from "./FilterTerritories"
import type { TerritoryFilterState } from "./TerritoriesList"
import TerritoriesList from "./TerritoriesList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Territories.styled"

interface TerritoriesProps {
  territories: Territory[]
}

export default function Territories({ territories }: TerritoriesProps) {
  const [filters, setFilters] = useState<TerritoryFilterState>({
    search: "",
    availability: "all",
  })

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des territoires</h2>
          <span>{territories.length} territoires</span>
        </HeaderTitle>
        <HeaderActions>
          <FilterTerritories filters={filters} onFiltersChange={setFilters} />
          <AddTerritory />
        </HeaderActions>
      </Header>
      <TerritoriesList territories={territories} filters={filters} />
    </Container>
  )
}
