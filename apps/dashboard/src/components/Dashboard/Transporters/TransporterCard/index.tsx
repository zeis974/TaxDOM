import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import type { Transporter } from "@taxdom/types"
import { useMemo, useState } from "react"
import {
  BooleanToggle,
  crudHandlers,
  DetailIcon,
  DetailLabel,
  DetailList,
  DetailRow,
  DetailValue,
  DetailValueInput,
  DrawerSection,
  EntityCard,
  EntityDrawer,
  EntityDrawerActions,
  RulesEditorButton,
  StatusBadge,
} from "@/components/Dashboard/shared"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { api } from "@/lib/api"

type Props = {
  transporter: Transporter
  editable?: boolean
}

export default function TransporterCard({ transporter, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [transporterName, setTransporterName] = useState(transporter.transporterName)
  const [available, setAvailable] = useState(transporter.available)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const updateMutation = useMutation(
    api.transporters.update.mutationOptions(
      crudHandlers(queryClient, api.transporters.index.pathKey(), {
        success: "Transporteur mis à jour",
        error: "Erreur lors de la mise à jour",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const deleteMutation = useMutation(
    api.transporters.destroy.mutationOptions(
      crudHandlers(queryClient, api.transporters.index.pathKey(), {
        success: "Transporteur supprimé",
        error: "Erreur lors de la suppression",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const isFormValid = useMemo(() => Boolean(transporterName.trim()), [transporterName])

  const handleCardClick = () => {
    setTransporterName(transporter.transporterName)
    setAvailable(transporter.available)
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) drawer.setOpen(true)
    else drawer.closeDrawer()
  }

  const handleSave = () => {
    if (!isFormValid) return
    updateMutation.mutate({
      params: { id: transporter.transporterID },
      body: { transporterName: transporterName.trim(), available },
    })
  }

  const handleDelete = () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: transporter.transporterID } })
  }

  const handleOpenRulesEditor = () => {
    navigate({
      to: "/transporters/editor/$id",
      params: { id: transporter.transporterID },
    })
  }

  return (
    <>
      <EntityCard
        title={transporter.transporterName}
        onClick={editable ? handleCardClick : undefined}
      >
        <StatusBadge active={transporter.available}>
          {transporter.available ? "Activé" : "Désactivé"}
        </StatusBadge>
      </EntityCard>

      {editable && (
        <EntityDrawer
          open={drawer.open}
          onOpenChange={handleOpenChange}
          title={transporter.transporterName}
          subtitle={`Transporteur · #${transporter.transporterID}`}
          footer={
            <EntityDrawerActions
              onDelete={handleDelete}
              onSave={handleSave}
              saving={updateMutation.isPending}
              deleting={deleteMutation.isPending || drawer.isDeletingLocal}
              saveDisabled={!isFormValid}
              error={drawer.deleteError}
              extraActions={
                <RulesEditorButton type="button" onClick={handleOpenRulesEditor}>
                  Éditeur de règles
                </RulesEditorButton>
              }
            />
          }
        >
          <DrawerSection>
            <DetailList>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </DetailIcon>
                  Nom
                </DetailLabel>
                <DetailValue>
                  <DetailValueInput
                    type="text"
                    value={transporterName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTransporterName(e.target.value.toUpperCase())
                    }
                  />
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11" />
                    </svg>
                  </DetailIcon>
                  Statut
                </DetailLabel>
                <DetailValue>
                  <BooleanToggle
                    value={available}
                    onChange={setAvailable}
                    trueLabel="Activé"
                    falseLabel="Désactivé"
                  />
                </DetailValue>
              </DetailRow>
            </DetailList>
          </DrawerSection>
        </EntityDrawer>
      )}
    </>
  )
}
