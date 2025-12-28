"use client"

import type { Origin } from "@taxdom/types"
import { useActionState, useMemo, useState } from "react"
import { Drawer } from "vaul"

import { deleteOrigin } from "@/actions/origins/deleteOrigin"
import { updateOrigin } from "@/actions/origins/updateOrigin"
import { useResettableTimeout } from "@/hooks/useResettableTimeout"

import Button from "@/components/ui/Button"

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
  DrawerForm,
  DrawerHeader,
  DrawerHeaderActions,
  DrawerHeaderButton,
  DrawerHeaderContent,
  DrawerOverlay,
  DrawerSection,
  DrawerSubtitle,
  DrawerTitle,
  ErrorContainer,
  ProcessHistoryContent,
  ProcessHistoryDescription,
  ProcessHistoryIconWrapper,
  ProcessHistoryItem,
  ProcessHistoryTimeline,
  ProcessHistoryTimestamp,
  ProcessHistoryTitle,
  ProductsCount,
  StatusBadge,
  StatusTagButton,
} from "./OriginCard.styled"

type OriginWithCount = Origin & {
  productsCount?: number
}

type UpdateOriginState = Awaited<ReturnType<typeof updateOrigin>>

type Props = {
  origin: OriginWithCount
  onClick?: () => void
  editable?: boolean
}

export default function OriginCard({ origin, onClick, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [didCopyOriginId, setDidCopyOriginId] = useState(false)
  const copyResetTimeout = useResettableTimeout()

  const initialUpdateOriginState: UpdateOriginState = {
    success: false,
    errors: [],
  }

  const [state, action, pending] = useActionState<UpdateOriginState, FormData>(
    async (prevState, formData) => {
      const result = await updateOrigin(prevState, formData)
      if (result?.success) {
        setOpen(false)
        setIsEditing(false)
      }
      return result
    },
    initialUpdateOriginState,
  )
  const [originName, setOriginName] = useState(origin.name)
  const [available, setAvailable] = useState(origin.available ? "Oui" : "Non")
  const [isEU, setIsEU] = useState(origin.isEU ? "Oui" : "Non")
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const resetFormFromOrigin = () => {
    setOriginName(origin.name)
    setAvailable(origin.available ? "Oui" : "Non")
    setIsEU(origin.isEU ? "Oui" : "Non")
  }

  const isFormValid = useMemo(
    () => Boolean(originName?.trim() && available?.trim() && isEU?.trim()),
    [originName, available, isEU],
  )

  const handleCardClick = () => {
    onClick?.()
    if (!editable) {
      return
    }

    setDeleteError(null)
    setIsEditing(false)
    resetFormFromOrigin()
    setOpen(true)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (nextOpen) {
      setDeleteError(null)
      setIsEditing(false)
      resetFormFromOrigin()
      return
    }

    setDeleteError(null)
    setIsEditing(false)
    setDidCopyOriginId(false)

    copyResetTimeout.clear()
  }

  const onDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteOrigin(origin.originID)

    if (!result.success) {
      setDeleteError(result.error ?? "Erreur lors de la suppression de l'origine")
      setIsDeleting(false)
      return
    }

    setIsDeleting(false)
    setOpen(false)
  }

  const renderCardContent = <CardContent origin={origin} />

  const formErrors = open ? (state?.errors ?? []) : []

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // no-op (no toast in current design system)
      return false
    }
  }

  const copyOriginId = async () => {
    const didCopy = await copyToClipboard(origin.originID)
    if (!didCopy) return

    setDidCopyOriginId(true)

    copyResetTimeout.start(() => {
      setDidCopyOriginId(false)
    }, 3000)
  }

  return (
    <>
      {editable || onClick ? (
        <ClickableCard type="button" onClick={handleCardClick} data-clickable>
          {renderCardContent}
        </ClickableCard>
      ) : (
        <Card>{renderCardContent}</Card>
      )}

      {editable && (
        <Drawer.Root open={open} onOpenChange={handleOpenChange} direction="right">
          <Drawer.Portal>
            <DrawerOverlay />
            <Drawer.Content asChild>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHeaderContent>
                    <DrawerTitle>{origin.name}</DrawerTitle>
                    <DrawerSubtitle>#{origin.originID}</DrawerSubtitle>
                  </DrawerHeaderContent>
                  <DrawerHeaderActions>
                    <DrawerHeaderButton
                      type="button"
                      title={isEditing ? "Mode édition" : "Modifier"}
                      aria-label={isEditing ? "Mode édition" : "Modifier"}
                      onClick={() => setIsEditing(true)}
                      disabled={pending}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </DrawerHeaderButton>
                    <Drawer.Close asChild>
                      <DrawerCloseButton aria-label="Fermer le panneau">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </DrawerCloseButton>
                    </Drawer.Close>
                  </DrawerHeaderActions>
                </DrawerHeader>

                <DrawerForm action={action} autoComplete="off">
                  <input type="hidden" name="originID" value={origin.originID} />
                  <input type="hidden" name="available" value={available} />
                  <input type="hidden" name="isEU" value={isEU} />
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
                            <DetailValueCopyable
                              type="button"
                              onClick={copyOriginId}
                              aria-label={didCopyOriginId ? "ID copié" : "Copier l'ID"}
                              title={didCopyOriginId ? "Copié" : "Copier"}
                            >
                              {origin.originID}
                              {didCopyOriginId ? (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              ) : (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
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
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                              </svg>
                            </DetailIcon>
                            Nom
                          </DetailLabel>
                          <DetailValue>
                            {isEditing ? (
                              <DetailValueInput
                                type="text"
                                name="originName"
                                placeholder="FRANCE"
                                autoComplete="off"
                                required
                                value={originName}
                                onChange={(e) => setOriginName(e.target.value)}
                                aria-label="Nom de l'origine"
                              />
                            ) : (
                              originName
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
                              >
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              </svg>
                            </DetailIcon>
                            Produits liés
                          </DetailLabel>
                          <DetailValue>
                            {typeof origin.productsCount === "number"
                              ? `${origin.productsCount} produit${origin.productsCount !== 1 ? "s" : ""}`
                              : "—"}
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
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                            </DetailIcon>
                            Statut
                          </DetailLabel>
                          {isEditing ? (
                            <StatusTagButton
                              type="button"
                              data-status={available === "Oui" ? "approved" : "failed"}
                              onClick={() =>
                                setAvailable((prev) => (prev === "Oui" ? "Non" : "Oui"))
                              }
                              aria-pressed={available === "Oui"}
                              title="Cliquer pour basculer"
                              disabled={pending}
                            >
                              {available === "Oui" ? "Activé" : "Désactivé"}
                            </StatusTagButton>
                          ) : (
                            <StatusBadge data-status={available === "Oui" ? "approved" : "failed"}>
                              {available === "Oui" ? "Activé" : "Désactivé"}
                            </StatusBadge>
                          )}
                        </DetailRow>

                        <DetailRow>
                          <DetailLabel>
                            <DetailIcon>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                            </DetailIcon>
                            Zone
                          </DetailLabel>
                          <DetailValue>
                            {isEditing ? (
                              <StatusTagButton
                                type="button"
                                data-status="pending"
                                onClick={() => setIsEU((prev) => (prev === "Oui" ? "Non" : "Oui"))}
                                aria-pressed={isEU === "Oui"}
                                title="Cliquer pour basculer"
                                disabled={pending}
                              >
                                {isEU === "Oui" ? "Union Européenne" : "Hors Union Européenne"}
                              </StatusTagButton>
                            ) : (
                              <StatusBadge data-status="pending">
                                {isEU === "Oui" ? "Union Européenne" : "Hors Union Européenne"}
                              </StatusBadge>
                            )}
                          </DetailValue>
                        </DetailRow>
                      </DetailList>
                    </DrawerSection>

                    <DrawerSection>
                      <ProcessHistoryTimeline>
                        <ProcessHistoryItem>
                          <ProcessHistoryIconWrapper data-status="pending">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                          </ProcessHistoryIconWrapper>
                          <ProcessHistoryContent>
                            <ProcessHistoryTitle>Aucune activité enregistrée</ProcessHistoryTitle>
                            <ProcessHistoryDescription>
                              Le suivi des modifications sera disponible prochainement.
                            </ProcessHistoryDescription>
                            <ProcessHistoryTimestamp>—</ProcessHistoryTimestamp>
                          </ProcessHistoryContent>
                        </ProcessHistoryItem>
                      </ProcessHistoryTimeline>
                    </DrawerSection>
                  </DrawerBody>

                  <DrawerFooter>
                    <ErrorContainer>
                      {formErrors.map((err, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: feedback-only
                        <span key={index}>{err}</span>
                      ))}
                      {deleteError && <span>{deleteError}</span>}
                    </ErrorContainer>
                    <ActionsGroup>
                      <DeleteButton
                        type="button"
                        onClick={onDelete}
                        disabled={pending || isDeleting}
                      >
                        {isDeleting ? "Suppression..." : "Supprimer"}
                      </DeleteButton>
                      <Button type="submit" disabled={!isEditing || !isFormValid || pending}>
                        {pending ? "Sauvegarde..." : "Sauvegarder"}
                      </Button>
                    </ActionsGroup>
                  </DrawerFooter>
                </DrawerForm>
              </DrawerContent>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  )
}

function CardContent({ origin }: { origin: OriginWithCount }) {
  return (
    <>
      <CardHeader>
        <CardTitle title={origin.name}>{origin.name}</CardTitle>
        <BadgeContainer>
          {origin.isEU && <Badge data-type="eu">UE</Badge>}
          <Badge data-type={origin.available ? "available" : "unavailable"}>
            {origin.available ? "Activé" : "Désactivé"}
          </Badge>
        </BadgeContainer>
      </CardHeader>
      <ProductsCount>
        {origin.productsCount !== undefined
          ? `${origin.productsCount} produit${origin.productsCount !== 1 ? "s" : ""} lié${origin.productsCount !== 1 ? "s" : ""}`
          : "Chargement..."}
      </ProductsCount>
    </>
  )
}
