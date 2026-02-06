"use client"

import { useActionState, useEffect, useId, useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Drawer } from "vaul"
import type { Transporter } from "@taxdom/types"
import Button from "@/components/ui/Button"
import { updateTransporter } from "@/actions/transporters/updateTransporter"
import { deleteTransporter } from "@/actions/transporters/deleteTransporter"
import { useResettableTimeout } from "@/hooks/useResettableTimeout"
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  BadgeContainer,
  Badge,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerHeaderActions,
  DrawerHeaderButton,
  DrawerSubtitle,
  DrawerTitle,
  DrawerCloseButton,
  DrawerForm,
  DrawerBody,
  DrawerSection,
  DrawerSectionTitle,
  DrawerSectionDescription,
  DetailList,
  DetailRow,
  DetailLabel,
  DetailIcon,
  DetailValue,
  DetailValueInput,
  DetailValueCopyable,
  StatusTagButton,
  StatusBadge,
  DrawerFooter,
  ActionsGroup,
  ErrorContainer,
  DeleteButton,
} from "./TransporterCard.styled"

type Props = {
  transporter: Transporter
  onClick?: () => void
  editable?: boolean
}

export default function TransporterCard({ transporter, onClick, editable = false }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [didCopyTransporterId, setDidCopyTransporterId] = useState(false)
  const copyResetTimeout = useResettableTimeout()
  const [state, action, pending] = useActionState(updateTransporter, {
    success: false,
    errors: [],
  })
  const [transporterName, setTransporterName] = useState(transporter.transporterName)
  const [isAvailable, setIsAvailable] = useState(transporter.available)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const transporterNameId = useId()

  const isFormValid = useMemo(() => Boolean(transporterName.trim()), [transporterName])

  const resetForm = useCallback(() => {
    setTransporterName(transporter.transporterName)
    setIsAvailable(transporter.available)
    setDeleteError(null)
    setIsEditing(false)
  }, [transporter])

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return false
    }
  }

  const copyTransporterId = async () => {
    const didCopy = await copyToClipboard(transporter.transporterID)
    if (!didCopy) return

    setDidCopyTransporterId(true)

    copyResetTimeout.start(() => {
      setDidCopyTransporterId(false)
    }, 3000)
  }

  const handleOpenRulesEditor = useCallback(() => {
    router.push(`/dashboard/transporters/editors/${transporter.transporterID}`)
  }, [router, transporter.transporterID])

  const handleCardClick = useCallback(() => {
    onClick?.()
    if (!editable) return
    resetForm()
    setOpen(true)
  }, [onClick, editable, resetForm])

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) {
        resetForm()
        setDidCopyTransporterId(false)
        copyResetTimeout.clear()
      }
    },
    [resetForm, copyResetTimeout],
  )

  // Sync form state when transporter prop changes
  useEffect(() => {
    if (!open) resetForm()
  }, [open, resetForm])

  // Close drawer on successful update
  useEffect(() => {
    if (state?.success) {
      setOpen(false)
      setIsEditing(false)
    }
  }, [state?.success])

  const onDelete = useCallback(async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      const result = await deleteTransporter(transporter.transporterID)
      if (!result.success) {
        setDeleteError(result.error || "Erreur lors de la suppression")
      } else {
        setOpen(false)
      }
    } finally {
      setIsDeleting(false)
    }
  }, [isDeleting, transporter.transporterID])

  const CardContent = (
    <>
      <CardHeader>
        <CardTitle title={transporter.transporterName}>{transporter.transporterName}</CardTitle>
      </CardHeader>
      <BadgeContainer>
        <Badge data-type={transporter.available ? "available" : "unavailable"}>
          {transporter.available ? "Disponible" : "Indisponible"}
        </Badge>
      </BadgeContainer>
    </>
  )

  if (!editable) {
    return <Card onClick={onClick}>{CardContent}</Card>
  }

  const formErrors = open ? (state?.errors ?? []) : []

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} direction="right">
      <Drawer.Trigger asChild>
        <ClickableCard onClick={handleCardClick}>{CardContent}</ClickableCard>
      </Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay />
        <Drawer.Content asChild>
          <DrawerContent>
            <Drawer.Title hidden>{transporter.transporterName}</Drawer.Title>
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>{transporter.transporterName}</DrawerTitle>
                <DrawerSubtitle>#{transporter.transporterID}</DrawerSubtitle>
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
              <input type="hidden" name="transporterID" value={transporter.transporterID} />
              <input type="hidden" name="available" value={String(isAvailable)} />
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
                          onClick={copyTransporterId}
                          aria-label={didCopyTransporterId ? "ID copié" : "Copier l'ID"}
                          title={didCopyTransporterId ? "Copié" : "Copier"}
                        >
                          {transporter.transporterID}
                          {didCopyTransporterId ? (
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
                            id={transporterNameId}
                            name="transporterName"
                            value={transporterName}
                            onChange={(e) => setTransporterName(e.target.value)}
                            placeholder="Ex: DHL, FedEx..."
                            autoComplete="off"
                            required
                            aria-label="Nom du transporteur"
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
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </DetailIcon>
                        Statut
                      </DetailLabel>
                      <DetailValue>
                        {isEditing ? (
                          <StatusTagButton
                            type="button"
                            data-status={isAvailable ? "approved" : "failed"}
                            onClick={() => setIsAvailable((prev) => !prev)}
                            aria-pressed={isAvailable}
                            title="Cliquer pour basculer"
                            disabled={pending}
                          >
                            {isAvailable ? "Disponible" : "Indisponible"}
                          </StatusTagButton>
                        ) : (
                          <StatusBadge data-status={isAvailable ? "approved" : "failed"}>
                            {isAvailable ? "Disponible" : "Indisponible"}
                          </StatusBadge>
                        )}
                      </DetailValue>
                    </DetailRow>
                  </DetailList>
                </DrawerSection>

                <DrawerSection>
                  <DrawerSectionTitle>Règles de frais</DrawerSectionTitle>
                  <DrawerSectionDescription>
                    Configurez les frais appliqués par ce transporteur.
                  </DrawerSectionDescription>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleOpenRulesEditor}
                    style={{ marginTop: "8px" }}
                  >
                    ⚙️ Configurer les règles
                  </Button>
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
                  <DeleteButton type="button" onClick={onDelete} disabled={pending || isDeleting}>
                    {isDeleting ? "Suppression..." : "Supprimer"}
                  </DeleteButton>
                  <Button type="submit" disabled={!isEditing || !isFormValid || pending}>
                    {pending ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </ActionsGroup>
              </DrawerFooter>
            </DrawerForm>
          </DrawerContent>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
