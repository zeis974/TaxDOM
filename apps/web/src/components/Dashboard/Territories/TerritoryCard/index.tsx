"use client"

import { useActionState, useEffect, useId, useMemo, useState } from "react"
import { Drawer } from "vaul"
import type { Territory } from "@taxdom/types"
import Button from "@/components/ui/Button"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseRadio from "@/components/Forms/Radio/BaseRadio"
import { updateTerritory } from "@/actions/territories/updateTerritory"
import { deleteTerritory } from "@/actions/territories/deleteTerritory"
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
  DrawerBadges,
  DrawerBadge,
  DrawerMeta,
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
} from "./TerritoryCard.styled"

type Props = {
  territory: Territory
  onClick?: () => void
  editable?: boolean
}

export default function TerritoryCard({ territory, onClick, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(updateTerritory, {
    success: false,
    errors: [],
  })
  const [territoryName, setTerritoryName] = useState(territory.territoryName)
  const [available, setAvailable] = useState(territory.available ? "Oui" : "Non")
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const territoryNameId = useId()

  const isFormValid = useMemo(
    () => Boolean(territoryName.trim() && available.trim()),
    [territoryName, available],
  )

  const handleCardClick = () => {
    onClick?.()
    if (!editable) {
      return
    }

    setDeleteError(null)
    setTerritoryName(territory.territoryName)
    setAvailable(territory.available ? "Oui" : "Non")
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
      setTerritoryName(territory.territoryName)
      setAvailable(territory.available ? "Oui" : "Non")
    }
  }, [territory, open])

  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
  }, [state?.success])

  const onDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteTerritory(territory.territoryID)

    if (!result.success) {
      setDeleteError(result.error ?? "Erreur lors de la suppression du territoire")
      setIsDeleting(false)
      return
    }

    setIsDeleting(false)
    setOpen(false)
  }

  const renderCardContent = <CardContent territory={territory} />

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
                    <DrawerSubtitle>
                      <span>Territoire</span>
                      <span>#{territory.territoryID}</span>
                    </DrawerSubtitle>
                    <DrawerTitle>{territory.territoryName}</DrawerTitle>
                    <DrawerBadges>
                      <DrawerBadge data-variant={available === "Oui" ? "available" : "unavailable"}>
                        {available === "Oui" ? "Activé" : "Non activé"}
                      </DrawerBadge>
                    </DrawerBadges>
                    <DrawerMeta>
                      <span>ID API&nbsp;: {territory.territoryID}</span>
                      <span>Dernière mise à jour via API</span>
                    </DrawerMeta>
                  </div>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer le panneau">×</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>

                <DrawerForm action={action} autoComplete="off">
                  <input type="hidden" name="territoryID" value={territory.territoryID} />
                  <DrawerBody>
                    <DrawerSection>
                      <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Mettez à jour le nom d'affichage et l'activation de ce territoire.
                      </DrawerSectionDescription>
                      <FormGrid>
                        <InputContainer>
                          <label htmlFor={territoryNameId}>Nom du territoire</label>
                          <input
                            type="text"
                            id={territoryNameId}
                            name="territoryName"
                            placeholder="GUADELOUPE"
                            autoComplete="off"
                            required
                            value={territoryName}
                            onChange={(e) => setTerritoryName(e.target.value)}
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

function CardContent({ territory }: { territory: Territory }) {
  return (
    <>
      <CardHeader>
        <CardTitle title={territory.territoryName}>{territory.territoryName}</CardTitle>
        <BadgeContainer>
          <Badge data-type={territory.available ? "available" : "unavailable"}>
            {territory.available ? "Activé" : "Non activé"}
          </Badge>
        </BadgeContainer>
      </CardHeader>
      <ProductsCount>ID: {territory.territoryID}</ProductsCount>
    </>
  )
}
