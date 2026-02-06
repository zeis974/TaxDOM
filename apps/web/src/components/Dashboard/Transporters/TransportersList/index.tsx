import type { Transporter } from "@taxdom/types"

import TransporterCard from "@/components/Dashboard/Transporters/TransporterCard"

import { Container, NoTransporters, TransportersContainer } from "./TransportersList.styled"

interface TransportersListProps {
  transporters: Transporter[]
}

export default function TransportersList({ transporters }: TransportersListProps) {
  if (transporters.length === 0) {
    return (
      <Container>
        <NoTransporters>
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
          <h3>Aucun transporteur disponible</h3>
        </NoTransporters>
      </Container>
    )
  }

  return (
    <Container>
      <TransportersContainer>
        {transporters.map((transporter) => (
          <TransporterCard
            key={transporter.transporterID}
            transporter={transporter}
            editable={true}
          />
        ))}
      </TransportersContainer>
    </Container>
  )
}
