import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Product } from "@taxdom/types"
import { useId, useMemo, useState } from "react"
import { toast } from "sonner"
import { Drawer } from "vaul"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Button from "@/components/ui/Button"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
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
  DrawerHeader,
  DrawerHeaderContent,
  DrawerOverlay,
  DrawerSection,
  DrawerSectionDescription,
  DrawerSectionTitle,
  DrawerSubtitle,
  DrawerTitle,
  ErrorContainer,
  FormGrid,
} from "./ProductCard.styled"

type Props = {
  product: Product
  editable?: boolean
}

export default function ProductCard({ product, editable = false }: Props) {
  const drawer = useCardDrawer()
  const { data: formOptions } = useProductFormOptions()
  const inputId = useId()
  const [productName, setProductName] = useState(product.productName)
  const [categoryID, setCategoryID] = useState(product.category.categoryID)
  const [originID, setOriginID] = useState(product.origin.originID)
  const [territoryID, setTerritoryID] = useState(product.territory.territoryID)

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (vars: {
      params: { id: string }
      body: {
        productName: string
        categoryID: string
        originID: string
        territoryID: string
        taxID: string
      }
    }) => client.api.products.update(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produit mis à jour")
      drawer.closeDrawer()
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (vars: { params: { id: string } }) => client.api.products.destroy(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produit supprimé")
      drawer.closeDrawer()
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })

  const isFormValid = useMemo(
    () => Boolean(productName.trim() && categoryID && originID && territoryID),
    [productName, categoryID, originID, territoryID],
  )

  const handleCardClick = () => {
    if (!editable) return
    setProductName(product.productName)
    setCategoryID(product.category.categoryID)
    setOriginID(product.origin.originID)
    setTerritoryID(product.territory.territoryID)
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
      params: { id: product.productID },
      body: {
        productName: productName.trim(),
        categoryID,
        originID,
        territoryID,
        taxID: product.tax?.taxID ?? "",
      },
    })
  }

  const handleDelete = async () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: product.productID } })
  }

  const renderCardContent = (
    <>
      <CardHeader>
        <CardTitle title={product.productName}>{product.productName}</CardTitle>
        <BadgeContainer>
          <Badge data-type="category">{product.category.categoryName}</Badge>
        </BadgeContainer>
      </CardHeader>
      <CardInfo>
        {product.origin.originName} • {product.territory.territoryName}
      </CardInfo>
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
                    <DrawerTitle>{product.productName}</DrawerTitle>
                    <DrawerSubtitle>#{product.productID}</DrawerSubtitle>
                  </DrawerHeaderContent>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer">&times;</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>
                <DrawerBody>
                  <DrawerSection>
                    <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
                    <DrawerSectionDescription>
                      Mettez à jour les informations de ce produit.
                    </DrawerSectionDescription>
                    <FormGrid>
                      <InputContainer>
                        <label htmlFor={inputId}>Nom du produit</label>
                        <input
                          id={inputId}
                          type="text"
                          placeholder="Nom du produit"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </InputContainer>
                    </FormGrid>
                  </DrawerSection>
                  <DrawerSection>
                    <DrawerSectionTitle>Provenance</DrawerSectionTitle>
                    <DrawerSectionDescription>
                      Origine et territoire du produit.
                    </DrawerSectionDescription>
                    <FormGrid>
                      <BaseSelect
                        label="Catégorie"
                        options={formOptions?.categories ?? []}
                        value={
                          formOptions?.categories.find((c) => c.value === categoryID)?.name ?? ""
                        }
                        onChange={(val) => {
                          const found = formOptions?.categories.find((c) => c.name === val)
                          if (found) setCategoryID(found.value ?? found.name)
                        }}
                      />
                      <BaseSelect
                        label="Origine"
                        options={formOptions?.origins ?? []}
                        value={formOptions?.origins.find((o) => o.value === originID)?.name ?? ""}
                        onChange={(val) => {
                          const found = formOptions?.origins.find((o) => o.name === val)
                          if (found) setOriginID(found.value ?? found.name)
                        }}
                      />
                      <BaseSelect
                        label="Territoire"
                        options={formOptions?.territories ?? []}
                        value={
                          formOptions?.territories.find((t) => t.value === territoryID)?.name ?? ""
                        }
                        onChange={(val) => {
                          const found = formOptions?.territories.find((t) => t.name === val)
                          if (found) setTerritoryID(found.value ?? found.name)
                        }}
                      />
                    </FormGrid>
                  </DrawerSection>
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
              </DrawerContent>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  )
}
