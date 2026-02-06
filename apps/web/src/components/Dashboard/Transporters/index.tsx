import type { Transporter } from "@taxdom/types"

import AddTransporter from "./AddTransporter"
import TransportersList from "./TransportersList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Transporters.styled"

interface TransportersProps {
  transporters: Transporter[]
}

export default function Transporters({ transporters }: TransportersProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des transporteurs</h2>
          <span>
            {transporters.length} transporteur{transporters.length !== 1 ? "s" : ""}
          </span>
        </HeaderTitle>
        <HeaderActions>
          <AddTransporter />
        </HeaderActions>
      </Header>
      <TransportersList transporters={transporters} />
    </Container>
  )
}
