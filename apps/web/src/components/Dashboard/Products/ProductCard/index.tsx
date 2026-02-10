"use client"

import { useActionState, useEffect, useId, useMemo, useState } from "react"
import { Drawer } from "vaul"
import type { Product, SelectOption } from "@taxdom/types"
import Button from "@/components/ui/Button"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import { updateProduct } from "@/actions/products/updateProduct"
import { deleteProduct } from "@/actions/products/deleteProduct"
import {
  ProductCardRow,
  CategoryBadge,
  OriginBadge,
  FluxBadge,
  TerritoryBadge,
} from "../ProductsList/ProductsList.styled"
import {
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
} from "./ProductCard.styled"

type Props = {
  product: Product
  formData: {
    categories: SelectOption[]
    origins: SelectOption[]
    territories: SelectOption[]
    flux: SelectOption[]
    taxes: { taxID: string; tva: number; om: number; omr: number }[]
  }
  editable?: boolean
}

function formatTaxLabel(t: { tva: number; om: number; omr: number }) {
  return `TVA ${t.tva}% / OM ${t.om}% / OMR ${t.omr}%`
}

export default function ProductCard({ product, formData, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(updateProduct, {
    success: false,
    errors: [],
  })

  const [productName, setProductName] = useState(product.productName)
  const [categoryName, setCategoryName] = useState(product.category.categoryName)
  const [originName, setOriginName] = useState(product.origin.originName)
  const [territoryName, setTerritoryName] = useState(product.territory.territoryName)
  const [fluxName, setFluxName] = useState(product.flux.fluxName)
  const [taxName, setTaxName] = useState(formatTaxLabel(product.tax))

  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const productNameId = useId()

  // Map display names to IDs for hidden form inputs
  const categoryID = formData.categories.find((c) => c.name === categoryName)?.value ?? ""
  const originID = formData.origins.find((o) => o.name === originName)?.value ?? ""
  const territoryID = formData.territories.find((t) => t.name === territoryName)?.value ?? ""
  const fluxID = formData.flux.find((f) => f.name === fluxName)?.value ?? ""
  const taxID = formData.taxes.find((t) => formatTaxLabel(t) === taxName)?.taxID ?? ""

  // Options for BaseSelect (name-only so onChange always returns names)
  const categoryOptions = useMemo(
    () => formData.categories.map((c) => ({ name: c.name })),
    [formData.categories],
  )
  const originOptions = useMemo(
    () => formData.origins.map((o) => ({ name: o.name })),
    [formData.origins],
  )
  const territoryOptions = useMemo(
    () => formData.territories.map((t) => ({ name: t.name })),
    [formData.territories],
  )
  const fluxOptions = useMemo(() => formData.flux.map((f) => ({ name: f.name })), [formData.flux])
  const taxOptions = useMemo(
    () => formData.taxes.map((t) => ({ name: formatTaxLabel(t) })),
    [formData.taxes],
  )

  const isFormValid = useMemo(
    () => Boolean(productName.trim() && categoryID && originID && territoryID && fluxID && taxID),
    [productName, categoryID, originID, territoryID, fluxID, taxID],
  )

  const handleCardClick = () => {
    if (!editable) return
    setDeleteError(null)
    setProductName(product.productName)
    setCategoryName(product.category.categoryName)
    setOriginName(product.origin.originName)
    setTerritoryName(product.territory.territoryName)
    setFluxName(product.flux.fluxName)
    setTaxName(formatTaxLabel(product.tax))
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
      setProductName(product.productName)
      setCategoryName(product.category.categoryName)
      setOriginName(product.origin.originName)
      setTerritoryName(product.territory.territoryName)
      setFluxName(product.flux.fluxName)
      setTaxName(formatTaxLabel(product.tax))
    }
  }, [product, open])

  useEffect(() => {
    if (state?.success) {
      setOpen(false)
    }
  }, [state?.success])

  const onDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteProduct(product.productID)

    if (!result.success) {
      setDeleteError(result.error ?? "Erreur lors de la suppression du produit")
      setIsDeleting(false)
      return
    }

    setIsDeleting(false)
    setOpen(false)
  }

  const formErrors = open ? (state?.errors ?? []) : []

  return (
    <>
      <ProductCardRow type="button" onClick={handleCardClick}>
        <div>
          <span>{product.productName}</span>
          <CategoryBadge>{product.category.categoryName}</CategoryBadge>
        </div>
        <div>
          <OriginBadge>{product.origin.originName}</OriginBadge>
        </div>
        <div>
          <FluxBadge>{product.flux.fluxName}</FluxBadge>
        </div>
        <div>
          <TerritoryBadge>{product.territory.territoryName}</TerritoryBadge>
        </div>
        <div>
          <span>TVA {product.tax.tva}%</span>
          <span>
            OM {product.tax.om}% / OMR {product.tax.omr}%
          </span>
        </div>
      </ProductCardRow>

      {editable && (
        <Drawer.Root open={open} onOpenChange={handleOpenChange} direction="right">
          <Drawer.Portal>
            <DrawerOverlay />
            <Drawer.Content asChild>
              <DrawerContent>
                <DrawerHeader>
                  <div>
                    <DrawerSubtitle>
                      <span>Produit</span>
                      <span>#{product.productID}</span>
                    </DrawerSubtitle>
                    <DrawerTitle>{product.productName}</DrawerTitle>
                    <DrawerMeta>
                      <span>Catégorie : {product.category.categoryName}</span>
                      <span>Origine : {product.origin.originName}</span>
                    </DrawerMeta>
                  </div>
                  <Drawer.Close asChild>
                    <DrawerCloseButton aria-label="Fermer le panneau">&times;</DrawerCloseButton>
                  </Drawer.Close>
                </DrawerHeader>

                <DrawerForm action={action} autoComplete="off">
                  <input type="hidden" name="productID" value={product.productID} />
                  <input type="hidden" name="categoryID" value={categoryID} />
                  <input type="hidden" name="originID" value={originID} />
                  <input type="hidden" name="territoryID" value={territoryID} />
                  <input type="hidden" name="fluxID" value={fluxID} />
                  <input type="hidden" name="taxID" value={taxID} />

                  <DrawerBody>
                    <DrawerSection>
                      <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Mettez à jour les informations de ce produit.
                      </DrawerSectionDescription>
                      <FormGrid>
                        <InputContainer>
                          <label htmlFor={productNameId}>Nom du produit</label>
                          <input
                            type="text"
                            id={productNameId}
                            name="productName"
                            placeholder="Nom du produit"
                            autoComplete="off"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </InputContainer>
                        <BaseSelect
                          label="Catégorie"
                          placeholder="Sélectionnez une catégorie"
                          options={categoryOptions}
                          value={categoryName}
                          onChange={setCategoryName}
                          required
                        />
                      </FormGrid>
                    </DrawerSection>

                    <DrawerSection>
                      <DrawerSectionTitle>Provenance</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Définissez l'origine, le flux et le territoire associés.
                      </DrawerSectionDescription>
                      <FormGrid>
                        <BaseSelect
                          label="Origine"
                          placeholder="Sélectionnez une origine"
                          options={originOptions}
                          value={originName}
                          onChange={setOriginName}
                          required
                        />
                        <BaseSelect
                          label="Flux"
                          placeholder="Sélectionnez un flux"
                          options={fluxOptions}
                          value={fluxName}
                          onChange={setFluxName}
                          required
                        />
                        <BaseSelect
                          label="Territoire"
                          placeholder="Sélectionnez un territoire"
                          options={territoryOptions}
                          value={territoryName}
                          onChange={setTerritoryName}
                          required
                        />
                      </FormGrid>
                    </DrawerSection>

                    <DrawerSection>
                      <DrawerSectionTitle>Fiscalité</DrawerSectionTitle>
                      <DrawerSectionDescription>
                        Sélectionnez le barème de taxes applicable.
                      </DrawerSectionDescription>
                      <FormGrid data-columns="1">
                        <BaseSelect
                          label="Barème de taxes"
                          placeholder="Sélectionnez un barème"
                          options={taxOptions}
                          value={taxName}
                          onChange={setTaxName}
                          required
                        />
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
