import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category } from "@taxdom/types"
import { useId, useMemo, useState } from "react"
import { toast } from "sonner"
import { Drawer } from "vaul"
import TaxBar from "@/components/Dashboard/Categories/CategoriesList/TaxBar"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Button from "@/components/ui/Button"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { client } from "@/lib/api"
import {
  ActionsGroup,
  Badge,
  BadgeContainer,
  Card,
  CardHeader,
  CardInfo,
  CardTitle,
  ClickableCard,
  DeleteButton,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerForm,
  DrawerHeader,
  DrawerMeta,
  DrawerOverlay,
  DrawerSection,
  DrawerSectionDescription,
  DrawerSectionTitle,
  DrawerSubtitle,
  DrawerTitle,
  ErrorContainer,
  FormGrid,
} from "./CategoryCard.styled"

type Props = {
  category: Category
  onClick?: () => void
  editable?: boolean
}

export default function CategoryCard({ category, onClick, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [categoryName, setCategoryName] = useState(category.categoryName)

  const categoryNameId = useId()

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (vars: { params: { id: string }; body: { categoryName: string; taxID: string } }) =>
      client.api.categories.update(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Catégorie mise à jour")
      drawer.closeDrawer()
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (vars: { params: { id: string } }) => client.api.categories.destroy(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Catégorie supprimée")
      drawer.closeDrawer()
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })

  const isFormValid = useMemo(() => Boolean(categoryName.trim()), [categoryName])

  const handleCardClick = () => {
    onClick?.()
    if (!editable) return
    setCategoryName(category.categoryName)
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
    updateMutation.mutate({
      params: { id: category.categoryID },
      body: {
        categoryName: categoryName.trim(),
        taxID: category.taxID,
      },
    })
  }

  const handleDelete = async () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: category.categoryID } })
  }

  const renderCardContent = <CardContent category={category} />

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
        <Drawer.Root open={drawer.open} onOpenChange={handleOpenChange} direction="right">
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

                <DrawerForm autoComplete="off">
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
                      {drawer.deleteError && <span>{drawer.deleteError}</span>}
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
        lié
        {(category.relatedProducts ?? 0) !== 1 ? "s" : ""}
      </CardInfo>
    </>
  )
}
