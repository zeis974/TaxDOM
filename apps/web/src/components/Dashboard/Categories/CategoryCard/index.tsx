"use client"

import { useActionState, useEffect, useId, useMemo, useState } from "react"
import { Drawer } from "vaul"
import type { Category } from "@taxdom/types"
import Button from "@/components/ui/Button"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { updateCategory } from "@/actions/categories/updateCategory"
import { deleteCategory } from "@/actions/categories/deleteCategory"
import TaxBar from "@/components/Dashboard/Categories/CategoriesList/TaxBar"
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  BadgeContainer,
  Badge,
  CardInfo,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
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
} from "./CategoryCard.styled"

type Props = {
  category: Category
  onClick?: () => void
  editable?: boolean
}

export default function CategoryCard({ category, onClick, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(updateCategory, {
    success: false,
    errors: [],
  })
  const [categoryName, setCategoryName] = useState(category.categoryName)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const categoryNameId = useId()

  const isFormValid = useMemo(() => Boolean(categoryName.trim()), [categoryName])

  const handleCardClick = () => {
    onClick?.()
    if (!editable) {
      return
    }

    setDeleteError(null)
    setCategoryName(category.categoryName)
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
      setCategoryName(category.categoryName)
    }
  }, [category, open])

  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
  }, [state?.success])

  const onDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteCategory(category.categoryID)

    if (!result.success) {
      setDeleteError(result.error ?? "Erreur lors de la suppression de la catégorie")
      setIsDeleting(false)
      return
    }

    setIsDeleting(false)
    setOpen(false)
  }

  const renderCardContent = <CardContent category={category} />

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
                      <span>Catégorie</span>
                      <span>#{category.categoryID}</span>
                    </DrawerSubtitle>
                    <DrawerTitle>{category.categoryName}</DrawerTitle>
                    <DrawerMeta>
                      <span>
                        {category.relatedProducts ?? 0} produit
                        {(category.relatedProducts ?? 0) !== 1 ? "s" : ""} lié
                        {(category.relatedProducts ?? 0) !== 1 ? "s" : ""}
                      </span>
                      {category.taxes && (
                        <span>
                          TVA {category.taxes.tva}% / OM {category.taxes.om}% / OMR{" "}
                          {category.taxes.omr}%
                        </span>
                      )}
                    </DrawerMeta>
                  </div>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer le panneau">&times;</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>

                <DrawerForm action={action} autoComplete="off">
                  <input type="hidden" name="categoryID" value={category.categoryID} />
                  {category.taxID && <input type="hidden" name="taxID" value={category.taxID} />}
                  <DrawerBody>
                    <DrawerSection>
                      <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Mettez à jour le nom de cette catégorie.
                      </DrawerSectionDescription>
                      <FormGrid>
                        <InputContainer>
                          <label htmlFor={categoryNameId}>Nom de la catégorie</label>
                          <input
                            type="text"
                            id={categoryNameId}
                            name="categoryName"
                            placeholder="Nom de la catégorie"
                            autoComplete="off"
                            required
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                        </InputContainer>
                      </FormGrid>
                    </DrawerSection>

                    {category.taxes && (
                      <DrawerSection>
                        <DrawerSectionTitle>Fiscalité</DrawerSectionTitle>
                        <DrawerSectionDescription>
                          Barème de taxes associé à cette catégorie.
                        </DrawerSectionDescription>
                        <TaxBar taxes={category.taxes} />
                      </DrawerSection>
                    )}
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

function CardContent({ category }: { category: Category }) {
  return (
    <>
      <CardHeader>
        <CardTitle title={category.categoryName}>{category.categoryName}</CardTitle>
        <BadgeContainer>
          {(category.relatedProducts ?? 0) > 0 && (
            <Badge data-type="products">
              {category.relatedProducts} produit{(category.relatedProducts ?? 0) !== 1 ? "s" : ""}
            </Badge>
          )}
        </BadgeContainer>
      </CardHeader>
      {category.taxes && <TaxBar taxes={category.taxes} />}
      <CardInfo>
        {category.relatedProducts ?? 0} produit{(category.relatedProducts ?? 0) !== 1 ? "s" : ""}{" "}
        lié{(category.relatedProducts ?? 0) !== 1 ? "s" : ""}
      </CardInfo>
    </>
  )
}
