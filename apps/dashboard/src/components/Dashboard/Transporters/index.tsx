import type { Transporter } from "@taxdom/types"
import AddTransporter from "./AddTransporter"
import { Container, Header, HeaderActions, HeaderTitle } from "./Transporters.styled"
import TransportersList from "./TransportersList"

interface TransportersProps {
  transporters: Transporter[]
  onCreate: (data: { transporterName: string }) => Promise<unknown>
  onUpdate: (data: {
    transporterID: string
    transporterName: string
    available: boolean
  }) => Promise<unknown>
  onDelete: (transporterID: string) => Promise<unknown>
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  createErrors: string[]
  updateErrors: string[]
  deleteErrors: string[]
}

export default function Transporters({
  transporters,
  onCreate,
  onUpdate,
  onDelete,
  isCreating,
  isUpdating,
  isDeleting,
  createErrors,
  updateErrors,
  deleteErrors,
}: TransportersProps) {
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
          <AddTransporter onCreate={onCreate} isPending={isCreating} errors={createErrors} />
        </HeaderActions>
      </Header>
      <TransportersList
        transporters={transporters}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        updateErrors={updateErrors}
        deleteErrors={deleteErrors}
      />
    </Container>
  )
}
