import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Origin } from "@taxdom/types"
import { useMemo, useState } from "react"
import {
  Badge,
  BooleanToggle,
  crudHandlers,
  DetailIcon,
  DetailLabel,
  DetailList,
  DetailRow,
  DetailValue,
  DetailValueCopyable,
  DetailValueInput,
  DrawerSection,
  EntityCard,
  EntityDrawer,
  EntityDrawerActions,
  StatusBadge,
} from "@/components/shared"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { useResettableTimeout } from "@/hooks/useResettableTimeout"
import { api } from "@/lib/api"

type Props = {
  origin: Origin
  editable?: boolean
}

export default function OriginCard({ origin, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [originName, setOriginName] = useState(origin.name)
  const [available, setAvailable] = useState(origin.available)
  const [isEU, setIsEU] = useState(origin.isEU)
  const [didCopyOriginId, setDidCopyOriginId] = useState(false)
  const copyResetTimeout = useResettableTimeout()

  const queryClient = useQueryClient()

  const updateMutation = useMutation(
    api.origins.update.mutationOptions(
      crudHandlers(queryClient, api.origins.index.pathKey(), {
        success: "Origine mise à jour",
        error: "Erreur lors de la mise à jour",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const deleteMutation = useMutation(
    api.origins.destroy.mutationOptions(
      crudHandlers(queryClient, api.origins.index.pathKey(), {
        success: "Origine supprimée",
        error: "Erreur lors de la suppression",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const isFormValid = useMemo(() => Boolean(originName.trim()), [originName])

  const handleCardClick = () => {
    setOriginName(origin.name)
    setAvailable(origin.available)
    setIsEU(origin.isEU)
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    drawer.setOpen(nextOpen)
    if (!nextOpen) {
      drawer.resetDrawer()
      setDidCopyOriginId(false)
      copyResetTimeout.clear()
    }
  }

  const handleSave = () => {
    if (!isFormValid) return
    updateMutation.mutate({
      params: { id: origin.originID },
      body: { originName: originName.toUpperCase(), available, isEU },
    })
  }

  const handleDelete = () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: origin.originID } })
  }

  const copyOriginId = async () => {
    try {
      await navigator.clipboard.writeText(origin.originID)
      setDidCopyOriginId(true)
      copyResetTimeout.start(() => setDidCopyOriginId(false), 3000)
    } catch {}
  }

  return (
    <>
      <EntityCard
        title={origin.name}
        onClick={editable ? handleCardClick : undefined}
        badges={<Badge data-type="eu">{origin.isEU ? "UE" : "Non-UE"}</Badge>}
      >
        <StatusBadge active={origin.available}>
          {origin.available ? "Activée" : "Désactivée"}
        </StatusBadge>
      </EntityCard>

      {editable && (
        <EntityDrawer
          open={drawer.open}
          onOpenChange={handleOpenChange}
          title={origin.name}
          subtitle={`Origine · #${origin.originID}`}
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </DetailIcon>
                  ID
                </DetailLabel>
                <DetailValue>
                  <DetailValueCopyable type="button" onClick={copyOriginId}>
                    {origin.originID}
                    {didCopyOriginId ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        width="14"
                        height="14"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        width="14"
                        height="14"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </DetailValueCopyable>
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
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </DetailIcon>
                  Nom
                </DetailLabel>
                <DetailValue>
                  <DetailValueInput
                    type="text"
                    placeholder="FRANCE"
                    value={originName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOriginName(e.target.value.toUpperCase())
                    }
                  />
                </DetailValue>
              </DetailRow>
            </DetailList>
          </DrawerSection>

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
                    trueLabel="Activée"
                    falseLabel="Désactivée"
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </DetailIcon>
                  Zone
                </DetailLabel>
                <DetailValue>
                  <BooleanToggle
                    value={isEU}
                    onChange={setIsEU}
                    trueLabel="UE"
                    falseLabel="Non-UE"
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
