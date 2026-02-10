"use client"

import { useActionState, useEffect, useId, useMemo, useState } from "react"
import type { SelectOption } from "@taxdom/types"

import createProduct from "@/actions/products/createProduct"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"

import {
  AddProductBtn,
  AddProductContainer,
  ProductActions,
  ErrorContainer,
} from "./AddProduct.styled"

interface AddProductProps {
  formData: {
    categories: SelectOption[]
    origins: SelectOption[]
    territories: SelectOption[]
    flux: SelectOption[]
    taxes: { taxID: string; tva: number; om: number; omr: number }[]
  }
}

function formatTaxLabel(t: { tva: number; om: number; omr: number }) {
  return `TVA ${t.tva}% / OM ${t.om}% / OMR ${t.omr}%`
}

export default function AddProduct({ formData }: AddProductProps) {
  const [state, action, pending] = useActionState(createProduct, {
    success: false,
    errors: [],
  })
  const [show, setShow] = useState(false)

  const [productName, setProductName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [originName, setOriginName] = useState("")
  const [territoryName, setTerritoryName] = useState("")
  const [fluxName, setFluxName] = useState("")
  const [taxName, setTaxName] = useState("")

  const productNameID = useId()

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

  const isFormValid = Boolean(
    productName.trim() && categoryID && originID && territoryID && fluxID && taxID,
  )

  const formErrors = state?.errors ?? []

  // Reset form fields when modal closes
  useEffect(() => {
    if (!show) {
      setProductName("")
      setCategoryName("")
      setOriginName("")
      setTerritoryName("")
      setFluxName("")
      setTaxName("")
    }
  }, [show])

  // Auto-close on successful creation
  useEffect(() => {
    if (state?.success && show) {
      setShow(false)
    }
  }, [state?.success, show])

  return (
    <>
      <AddProductBtn type="button" onClick={() => setShow(true)}>
        Ajouter un produit
      </AddProductBtn>
      <Modal show={show} setShow={setShow}>
        <AddProductContainer>
          <h2>Ajouter un produit</h2>
          <hr />
          <form action={action} autoComplete="off">
            <input type="hidden" name="categoryID" value={categoryID} />
            <input type="hidden" name="originID" value={originID} />
            <input type="hidden" name="territoryID" value={territoryID} />
            <input type="hidden" name="fluxID" value={fluxID} />
            <input type="hidden" name="taxID" value={taxID} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <InputContainer>
                <label htmlFor={productNameID}>Nom du produit</label>
                <input
                  type="text"
                  name="productName"
                  id={productNameID}
                  placeholder="Nom du produit"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  autoComplete="off"
                  required
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
              <BaseSelect
                label="Barème de taxes"
                placeholder="Sélectionnez un barème"
                options={taxOptions}
                value={taxName}
                onChange={setTaxName}
                required
              />
            </div>

            <ProductActions>
              <ErrorContainer>
                {formErrors.length > 0 &&
                  formErrors.map((error, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: _
                    <span key={index}>{error}</span>
                  ))}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={() => setShow(false)}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || pending}>
                  {pending ? "Création..." : "Créer le produit"}
                </Button>
              </div>
            </ProductActions>
          </form>
        </AddProductContainer>
      </Modal>
    </>
  )
}
