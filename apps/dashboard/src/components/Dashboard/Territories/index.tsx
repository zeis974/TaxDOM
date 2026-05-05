import type { Territory } from "@taxdom/types"
import AddTerritory from "./AddTerritory"
import { Container, Header, HeaderActions, HeaderTitle } from "./Territories.styled"
import TerritoriesList from "./TerritoriesList"

interface TerritoriesProps {
  territories: Territory[]
}

export default function Territories({ territories }: TerritoriesProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des territoires</h2>
          <span>{territories.length} territoires</span>
        </HeaderTitle>
        <HeaderActions>
          <AddTerritory />
        </HeaderActions>
      </Header>
      <TerritoriesList territories={territories} />
    </Container>
  )
}
