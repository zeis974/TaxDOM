import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Territory } from "@taxdom/types"
import { useMemo, useState } from "react"
import {
  BooleanToggle,
  CardInfo,
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
  StatusBadge,
} from "@/components/shared"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { api } from "@/lib/api"

type Props = {
  territory: Territory
  editable?: boolean
}

export default function TerritoryCard({ territory, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [territoryName, setTerritoryName] = useState(territory.territoryName)
  const [available, setAvailable] = useState(territory.available)

  const queryClient = useQueryClient()

  const updateMutation = useMutation(
    api.territories.update.mutationOptions(
      crudHandlers(queryClient, api.territories.index.pathKey(), {
        success: "Territoire mis à jour",
        error: "Erreur lors de la mise à jour",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const deleteMutation = useMutation(
    api.territories.destroy.mutationOptions(
      crudHandlers(queryClient, api.territories.index.pathKey(), {
        success: "Territoire supprimé",
        error: "Erreur lors de la suppression",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const isFormValid = useMemo(() => Boolean(territoryName.trim()), [territoryName])

  const handleCardClick = () => {
    setTerritoryName(territory.territoryName)
    setAvailable(territory.available)
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) drawer.setOpen(true)
    else drawer.closeDrawer()
  }

  const handleSave = () => {
    if (!isFormValid) return
    updateMutation.mutate({
      params: { id: territory.territoryID },
      body: { territoryName: territoryName.trim(), available },
    })
  }

  const handleDelete = () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: territory.territoryID } })
  }

  return (
    <>
      <EntityCard title={territory.territoryName} onClick={editable ? handleCardClick : undefined}>
        <StatusBadge active={territory.available}>
          {territory.available ? "Activé" : "Désactivé"}
        </StatusBadge>
        <CardInfo>ID: {territory.territoryID}</CardInfo>
      </EntityCard>

      {editable && (
        <EntityDrawer
          open={drawer.open}
          onOpenChange={handleOpenChange}
          title={territory.territoryName}
          subtitle={`Territoire · #${territory.territoryID}`}
          footer={
            <EntityDrawerActions
              onDelete={handleDelete}
              onSave={handleSave}
              saving={updateMutation.isPending}
              deleting={deleteMutation.isPending || drawer.isDeletingLocal}
              saveDisabled={!isFormValid}
              error={drawer.deleteError}
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
                    value={territoryName}
                    onChange={(e) => setTerritoryName(e.target.value)}
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
