import { useNavigate } from "@tanstack/react-router"
import type { Transporter } from "@taxdom/types"
import { useMemo, useState } from "react"
import { Drawer } from "vaul"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import Button from "@/components/ui/Button"
import {
  ActionsGroup,
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
  RulesEditorButton,
  StatusBadge,
  StatusTagButton,
} from "./TransporterCard.styled"

type Props = {
  transporter: Transporter
  editable?: boolean
  onUpdate: (data: {
    transporterID: string
    transporterName: string
    available: boolean
  }) => Promise<unknown>
  onDelete: (transporterID: string) => Promise<unknown>
  isUpdating: boolean
  isDeleting: boolean
  updateErrors: string[]
  deleteErrors: string[]
}

export default function TransporterCard({
  transporter,
  editable = false,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
  updateErrors,
  deleteErrors,
}: Props) {
  const drawer = useCardDrawer()
  const [transporterName, setTransporterName] = useState(transporter.transporterName)
  const [available, setAvailable] = useState(transporter.available)
  const navigate = useNavigate()

  const isFormValid = useMemo(() => Boolean(transporterName.trim()), [transporterName])

  const handleCardClick = () => {
    if (!editable) return
    setTransporterName(transporter.transporterName)
    setAvailable(transporter.available)
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      drawer.setOpen(true)
    } else {
      drawer.closeDrawer()
    }
  }

  const handleSave = async () => {
    if (!isFormValid) return
    await onUpdate({
      transporterID: transporter.transporterID,
      transporterName: transporterName.trim(),
      available,
    })
    if (!updateErrors.length) drawer.closeDrawer()
  }

  const handleDelete = async () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    try {
      await onDelete(transporter.transporterID)
      drawer.closeDrawer()
    } catch {
      drawer.setDeleteError("Erreur lors de la suppression")
    }
    drawer.setIsDeletingLocal(false)
  }

  const handleOpenRulesEditor = () => {
    navigate({
      to: "/dashboard/transporters/editor/$id",
      params: { id: transporter.transporterID },
    })
  }

  const renderCardContent = (
    <>
      <CardHeader>
        <CardTitle title={transporter.transporterName}>{transporter.transporterName}</CardTitle>
      </CardHeader>
      <StatusBadge data-active={transporter.available}>
        {transporter.available ? "Activé" : "Désactivé"}
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
                    <DrawerTitle>{transporter.transporterName}</DrawerTitle>
                    <DrawerSubtitle>#{transporter.transporterID}</DrawerSubtitle>
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
                              value={transporterName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setTransporterName(e.target.value.toUpperCase())
                              }
                            />
                          ) : (
                            transporterName
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
                                Oui
                              </StatusTagButton>
                              <StatusTagButton
                                type="button"
                                data-active={!available}
                                onClick={() => setAvailable(false)}
                              >
                                Non
                              </StatusTagButton>
                            </div>
                          ) : (
                            <StatusBadge data-active={available}>
                              {available ? "Activé" : "Désactivé"}
                            </StatusBadge>
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
                    <RulesEditorButton type="button" onClick={handleOpenRulesEditor}>
                      Éditeur de règles
                    </RulesEditorButton>
                    <DeleteButton
                      type="button"
                      onClick={handleDelete}
                      disabled={isUpdating || isDeleting || drawer.isDeletingLocal}
                    >
                      {isDeleting || drawer.isDeletingLocal ? "Suppression..." : "Supprimer"}
                    </DeleteButton>
                    <Drawer.Close asChild>
                      <Button type="button">Annuler</Button>
                    </Drawer.Close>
                    <Button
                      type="button"
                      onClick={handleSave}
                      aria-disabled={!isFormValid || isUpdating}
                    >
                      {isUpdating ? "Sauvegarde..." : "Sauvegarder"}
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
