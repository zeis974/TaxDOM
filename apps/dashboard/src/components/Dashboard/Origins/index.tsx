import type { Origin } from "@taxdom/types"
import AddOrigin from "./AddOrigin"
import { Container, Header, HeaderActions, HeaderTitle } from "./Origins.styled"
import OriginsList from "./OriginsList"

interface OriginsProps {
  origins: Origin[]
}

export default function Origins({ origins }: OriginsProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des origines</h2>
          <span>{origins.length} origines</span>
        </HeaderTitle>
        <HeaderActions>
          <AddOrigin />
        </HeaderActions>
      </Header>
      <OriginsList origins={origins} />
    </Container>
  )
}
