"use client"

import { useActionState, useEffect, useId, useMemo, useState } from "react"
import { Drawer } from "vaul"
import Button from "@/components/ui/Button"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseRadio from "@/components/Forms/Radio/BaseRadio"
import { updateOrigin } from "@/actions/origins/updateOrigin"
import { deleteOrigin } from "@/actions/origins/deleteOrigin"
import type { Origin } from "@taxdom/types"
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  BadgeContainer,
  Badge,
  ProductsCount,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerCloseButton,
  DrawerForm,
  DrawerBody,
  DrawerSection,
  DrawerSectionTitle,
  DrawerSectionDescription,
  FormGrid,
  DrawerFooter,
  ActionsGroup,
  ErrorContainer,
  DeleteButton,
  OriginDetailsGrid,
  OriginDetailItem,
  OriginDetailLabel,
  OriginDetailValue,
  StatusBadge,
  ProcessHistoryPlaceholder,
  ProcessHistoryPlaceholderIcon,
  ProcessHistoryText,
} from "./OriginCard.styled"

type OriginWithCount = Origin & {
  productsCount?: number
}

type Props = {
  origin: OriginWithCount
  onClick?: () => void
  editable?: boolean
}

export default function OriginCard({ origin, onClick, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(updateOrigin, {
    success: false,
    errors: [],
  })
  const [originName, setOriginName] = useState(origin.name)
  const [available, setAvailable] = useState(origin.available ? "Oui" : "Non")
  const [isEU, setIsEU] = useState(origin.isEU ? "Oui" : "Non")
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const originNameId = useId()

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
    setOriginName(origin.name)
    setAvailable(origin.available ? "Oui" : "Non")
    setIsEU(origin.isEU ? "Oui" : "Non")
    setOpen(true)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setDeleteError(null)
    }
  }

  useEffect(() => {
    if (!open) {
      setOriginName(origin.name)
      setAvailable(origin.available ? "Oui" : "Non")
      setIsEU(origin.isEU ? "Oui" : "Non")
    }
  }, [origin, open])

  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
  }, [state?.success])

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
                  <div>
                    <DrawerTitle>{origin.originID}</DrawerTitle>
                    <DrawerSubtitle>{origin.name}</DrawerSubtitle>
                  </div>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer le panneau">×</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>

                <DrawerForm action={action} autoComplete="off">
                  <input type="hidden" name="originID" value={origin.originID} />
                  <DrawerBody>
                    <DrawerSection>
                      <DrawerSectionTitle>Détails de l'origine</DrawerSectionTitle>
                      <OriginDetailsGrid>
                        <OriginDetailItem>
                          <OriginDetailLabel>ID Origine</OriginDetailLabel>
                          <OriginDetailValue>{origin.originID}</OriginDetailValue>
                        </OriginDetailItem>
                        <OriginDetailItem>
                          <OriginDetailLabel>Statut</OriginDetailLabel>
                          <OriginDetailValue>
                            <StatusBadge data-status={origin.available ? "approved" : "pending"}>
                              {origin.available ? "Activé" : "Non activé"}
                            </StatusBadge>
                          </OriginDetailValue>
                        </OriginDetailItem>
                        <OriginDetailItem>
                          <OriginDetailLabel>Zone</OriginDetailLabel>
                          <OriginDetailValue>
                            {origin.isEU ? "Union Européenne" : "Hors UE"}
                          </OriginDetailValue>
                        </OriginDetailItem>
                        <OriginDetailItem>
                          <OriginDetailLabel>Produits liés</OriginDetailLabel>
                          <OriginDetailValue>
                            {typeof origin.productsCount === "number"
                              ? `${origin.productsCount} produit${origin.productsCount !== 1 ? "s" : ""}`
                              : "Chargement..."}
                          </OriginDetailValue>
                        </OriginDetailItem>
                      </OriginDetailsGrid>
                    </DrawerSection>

                    <DrawerSection>
                      <DrawerSectionTitle>Historique des modifications</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Les modifications apportées à cette origine seront affichées ici
                        prochainement.
                      </DrawerSectionDescription>
                      <ProcessHistoryPlaceholder>
                        <ProcessHistoryPlaceholderIcon>📋</ProcessHistoryPlaceholderIcon>
                        <ProcessHistoryText>
                          Système de logs en cours de développement
                        </ProcessHistoryText>
                      </ProcessHistoryPlaceholder>
                      {/* 
                        Pour activer les logs, importer ProcessHistory depuis './ProcessHistory'
                        et remplacer le ProcessHistoryPlaceholder par :
                        
                        {origin.logs && origin.logs.length > 0 ? (
                          <ProcessHistory logs={origin.logs} />
                        ) : (
                          <ProcessHistoryPlaceholder>
                            <ProcessHistoryPlaceholderIcon>📋</ProcessHistoryPlaceholderIcon>
                            <ProcessHistoryText>Aucune modification enregistrée</ProcessHistoryText>
                          </ProcessHistoryPlaceholder>
                        )}
                      */}
                    </DrawerSection>

                    <DrawerSection>
                      <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Mettez à jour le nom d'affichage et l'activation de cette origine.
                      </DrawerSectionDescription>
                      <FormGrid>
                        <InputContainer>
                          <label htmlFor={originNameId}>Nom de l'origine</label>
                          <input
                            type="text"
                            id={originNameId}
                            name="originName"
                            placeholder="FRANCE"
                            autoComplete="off"
                            required
                            value={originName}
                            onChange={(e) => setOriginName(e.target.value)}
                          />
                        </InputContainer>
                        <InputContainer>
                          <BaseRadio
                            name="available"
                            label="Activé ?"
                            options={["Oui", "Non"]}
                            value={available}
                            onChange={setAvailable}
                            required
                          />
                        </InputContainer>
                      </FormGrid>
                    </DrawerSection>

                    <DrawerSection>
                      <DrawerSectionTitle>Union européenne</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Indiquez si l'origine appartient à l'Union européenne pour adapter les
                        calculs fiscaux.
                      </DrawerSectionDescription>
                      <FormGrid data-columns="1">
                        <InputContainer>
                          <BaseRadio
                            name="isEU"
                            label="Fait partie de l'Union européenne ?"
                            options={["Oui", "Non"]}
                            value={isEU}
                            onChange={setIsEU}
                            required
                          />
                        </InputContainer>
                      </FormGrid>
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
                      <Drawer.Close asChild>
                        <Button type="button">Annuler</Button>
                      </Drawer.Close>
                      <Button type="submit" aria-disabled={!isFormValid || pending}>
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
            {origin.available ? "Activé" : "Non activé"}
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
