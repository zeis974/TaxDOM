import type { Origin } from "@taxdom/types"
import { useMemo, useState } from "react"
import { Drawer } from "vaul"
import Button from "@/components/ui/Button"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { useEntityMutations } from "@/hooks/useEntityMutations"
import { useResettableTimeout } from "@/hooks/useResettableTimeout"
import {
  ActionsGroup,
  Badge,
  BadgeContainer,
  Card,
  CardHeader,
  CardTitle,
  ClickableCard,
  DeleteButton,
  DetailIcon,
  DetailLabel,
  DetailList,
  DetailRow,
  DetailValue,
  DetailValueCopyable,
  DetailValueInput,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerOverlay,
  DrawerSection,
  DrawerSubtitle,
  DrawerTitle,
  ErrorContainer,
  StatusBadge,
  StatusTagButton,
} from "./OriginCard.styled"

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

  const { updateMutation, deleteMutation } = useEntityMutations({
    queryKey: ["origins"],
    messages: {
      create: "Origine créée avec succès",
      update: "Origine mise à jour",
      delete: "Origine supprimée",
    },
  })

  const isFormValid = useMemo(() => Boolean(originName.trim()), [originName])

  const handleCardClick = () => {
    if (!editable) return
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

  const handleSave = async () => {
    if (!isFormValid) return
    await updateMutation.mutateAsync({
      url: `/v1/admin/origins/${origin.originID}`,
      body: {
        originID: origin.originID,
        originName: originName.toUpperCase(),
        available,
        isEU,
      },
    })
    drawer.closeDrawer()
  }

  const handleDelete = async () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    try {
      await deleteMutation.mutateAsync(`/v1/admin/origins/${origin.originID}`)
      drawer.closeDrawer()
    } catch {
      drawer.setDeleteError("Erreur lors de la suppression")
    }
    drawer.setIsDeletingLocal(false)
  }

  const copyOriginId = async () => {
    try {
      await navigator.clipboard.writeText(origin.originID)
      setDidCopyOriginId(true)
      copyResetTimeout.start(() => setDidCopyOriginId(false), 3000)
    } catch {}
  }

  const updateErrors = updateMutation.error ? ["Erreur lors de la mise à jour"] : []
  const deleteErrors = deleteMutation.error ? ["Erreur lors de la suppression"] : []

  const renderCardContent = (
    <>
      <CardHeader>
        <CardTitle title={origin.name}>{origin.name}</CardTitle>
        <BadgeContainer>
          <Badge data-type="eu">{origin.isEU ? "UE" : "Non-UE"}</Badge>
        </BadgeContainer>
      </CardHeader>
      <StatusBadge data-active={origin.available}>
        {origin.available ? "Activée" : "Désactivée"}
      </StatusBadge>
    </>
  )

  return (
    <>
      {editable ? (
        <ClickableCard type="button" onClick={handleCardClick} data-clickable>
          {renderCardContent}
        </ClickableCard>
      ) : (
        <Card>{renderCardContent}</Card>
      )}
      {editable && (
        <Drawer.Root open={drawer.open} onOpenChange={handleOpenChange} direction="right">
          <Drawer.Portal>
            <DrawerOverlay />
            <Drawer.Content asChild>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHeaderContent>
                    <DrawerTitle>{origin.name}</DrawerTitle>
                    <DrawerSubtitle>#{origin.originID}</DrawerSubtitle>
                  </DrawerHeaderContent>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer">&times;</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>
                <DrawerBody>
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
                          {drawer.isEditing ? (
                            <DetailValueInput
                              type="text"
                              placeholder="FRANCE"
                              value={originName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setOriginName(e.target.value.toUpperCase())
                              }
                            />
                          ) : (
                            originName
                          )}
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
                          {drawer.isEditing ? (
                            <div style={{ display: "flex", gap: 8 }}>
                              <StatusTagButton
                                type="button"
                                data-active={available}
                                onClick={() => setAvailable(true)}
                              >
                                Activée
                              </StatusTagButton>
                              <StatusTagButton
                                type="button"
                                data-active={!available}
                                onClick={() => setAvailable(false)}
                              >
                                Désactivée
                              </StatusTagButton>
                            </div>
                          ) : (
                            <StatusBadge data-active={available}>
                              {available ? "Activée" : "Désactivée"}
                            </StatusBadge>
                          )}
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
                          {drawer.isEditing ? (
                            <div style={{ display: "flex", gap: 8 }}>
                              <StatusTagButton
                                type="button"
                                data-active={isEU}
                                onClick={() => setIsEU(true)}
                              >
                                UE
                              </StatusTagButton>
                              <StatusTagButton
                                type="button"
                                data-active={!isEU}
                                onClick={() => setIsEU(false)}
                              >
                                Non-UE
                              </StatusTagButton>
                            </div>
                          ) : (
                            <Badge data-type="eu">{isEU ? "UE" : "Non-UE"}</Badge>
                          )}
                        </DetailValue>
                      </DetailRow>
                    </DetailList>
                  </DrawerSection>
                </DrawerBody>
                <DrawerFooter>
                  <ErrorContainer>
                    {updateErrors.map((err, i) => (
                      <span key={i}>{err}</span>
                    ))}
                    {drawer.deleteError && <span>{drawer.deleteError}</span>}
                    {deleteErrors.map((err, i) => (
                      <span key={i}>{err}</span>
                    ))}
                  </ErrorContainer>
                  <ActionsGroup>
                    <DeleteButton
                      type="button"
                      onClick={handleDelete}
                      disabled={
                        updateMutation.isPending ||
                        deleteMutation.isPending ||
                        drawer.isDeletingLocal
                      }
                    >
                      {deleteMutation.isPending || drawer.isDeletingLocal
                        ? "Suppression..."
                        : "Supprimer"}
                    </DeleteButton>
                    <Drawer.Close asChild>
                      <Button type="button">Annuler</Button>
                    </Drawer.Close>
                    <Button
                      type="button"
                      onClick={handleSave}
                      aria-disabled={!isFormValid || updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
                    </Button>
                  </ActionsGroup>
                </DrawerFooter>
              </DrawerContent>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  )
}
