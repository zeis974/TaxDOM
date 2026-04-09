import type { Product, SelectOption } from "@taxdom/types"
import { useMemo, useState } from "react"
import { Drawer } from "vaul"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Button from "@/components/ui/Button"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { useEntityMutations } from "@/hooks/useEntityMutations"
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

interface FormData {
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
  flux: SelectOption[]
  taxes: { taxID: string; tva: number; om: number; omr: number }[]
}

type Props = {
  product: Product
  formData: FormData
  editable?: boolean
}

export default function ProductCard({ product, formData, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [productName, setProductName] = useState(product.productName)
  const [categoryID, setCategoryID] = useState(product.category.categoryID)
  const [originID, setOriginID] = useState(product.origin.originID)
  const [territoryID, setTerritoryID] = useState(product.territory.territoryID)
  const [fluxID, setFluxID] = useState(product.flux.fluxID)

  const { updateMutation, deleteMutation } = useEntityMutations({
    queryKey: ["products"],
    messages: {
      create: "Produit créé avec succès",
      update: "Produit mis à jour",
      delete: "Produit supprimé",
    },
  })

  const isFormValid = useMemo(
    () => Boolean(productName.trim() && categoryID && originID && territoryID && fluxID),
    [productName, categoryID, originID, territoryID, fluxID],
  )

  const handleCardClick = () => {
    if (!editable) return
    setProductName(product.productName)
    setCategoryID(product.category.categoryID)
    setOriginID(product.origin.originID)
    setTerritoryID(product.territory.territoryID)
    setFluxID(product.flux.fluxID)
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
    try {
      await updateMutation.mutateAsync({
        url: `/v1/admin/products/${product.productID}`,
        body: {
          productID: product.productID,
          productName: productName.trim(),
          categoryID,
          originID,
          territoryID,
          fluxID,
        },
      })
      drawer.closeDrawer()
    } catch (error) {
      // Error is handled by useEntityMutations
    }
  }

  const handleDelete = async () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    try {
      await deleteMutation.mutateAsync(`/v1/admin/products/${product.productID}`)
      drawer.closeDrawer()
    } catch {
      drawer.setDeleteError("Erreur lors de la suppression")
    }
    drawer.setIsDeletingLocal(false)
  }

  const updateErrors = updateMutation.error ? ["Erreur lors de la mise à jour"] : []
  const deleteErrors = deleteMutation.error ? ["Erreur lors de la suppression"] : []

  const renderCardContent = (
    <>
      <CardHeader>
        <CardTitle title={product.productName}>{product.productName}</CardTitle>
        <BadgeContainer>
          <Badge data-type="category">{product.category.categoryName}</Badge>
        </BadgeContainer>
      </CardHeader>
      <CardInfo>
        {product.origin.originName} • {product.territory.territoryName} • {product.flux.fluxName}
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
                        <label>Nom du produit</label>
                        <input
                          type="text"
                          placeholder="Nom du produit"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </InputContainer>
                    </FormGrid>
                  </DrawerSection>
                  <DrawerSection>
                    <DrawerSectionTitle>Provenance & Flux</DrawerSectionTitle>
                    <DrawerSectionDescription>
                      Origine, flux et territoire du produit.
                    </DrawerSectionDescription>
                    <FormGrid>
                      <BaseSelect
                        label="Catégorie"
                        options={formData.categories}
                        value={formData.categories.find((c) => c.value === categoryID)?.name ?? ""}
                        onChange={(val) => {
                          const found = formData.categories.find((c) => c.name === val)
                          if (found) setCategoryID(found.value ?? found.name)
                        }}
                      />
                      <BaseSelect
                        label="Origine"
                        options={formData.origins}
                        value={formData.origins.find((o) => o.value === originID)?.name ?? ""}
                        onChange={(val) => {
                          const found = formData.origins.find((o) => o.name === val)
                          if (found) setOriginID(found.value ?? found.name)
                        }}
                      />
                      <BaseSelect
                        label="Territoire"
                        options={formData.territories}
                        value={
                          formData.territories.find((t) => t.value === territoryID)?.name ?? ""
                        }
                        onChange={(val) => {
                          const found = formData.territories.find((t) => t.name === val)
                          if (found) setTerritoryID(found.value ?? found.name)
                        }}
                      />
                      <BaseSelect
                        label="Flux"
                        options={formData.flux}
                        value={formData.flux.find((f) => f.value === fluxID)?.name ?? ""}
                        onChange={(val) => {
                          const found = formData.flux.find((f) => f.name === val)
                          if (found) setFluxID(found.value ?? found.name)
                        }}
                      />
                    </FormGrid>
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
