import { useId, useState } from "react"

import { useEntityMutations } from "@/hooks/useEntityMutations"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"

import { AddProductBtn, ErrorContainer, FormGrid } from "./AddProduct.styled"

export default function AddProduct() {
  const [show, setShow] = useState(false)
  const { data: formOptions, isLoading } = useProductFormOptions()
  const inputId = useId()
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")
  const [fluxID, setFluxID] = useState("")

  const { createMutation } = useEntityMutations({
    queryKey: ["products"],
    messages: {
      create: "Produit créé avec succès",
      update: "Produit mis à jour",
      delete: "Produit supprimé",
    },
  })

  const isFormValid = productName.trim() && categoryID && originID && territoryID && fluxID

  const resetForm = () => {
    setProductName("")
    setCategoryID("")
    setOriginID("")
    setTerritoryID("")
    setFluxID("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    try {
      await createMutation.mutateAsync({
        url: "/v1/admin/products",
        body: {
          productName: productName.trim(),
          categoryID,
          originID,
          territoryID,
          fluxID,
        },
      })
      handleClose()
    } catch (error) {
      // Error is handled by useEntityMutations
    }
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  const footer = (
    <>
      <Button type="button" onClick={handleClose}>
        Annuler
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit}
        aria-disabled={!isFormValid || createMutation.isPending}
      >
        {createMutation.isPending ? "Création..." : "Créer le produit"}
      </Button>
    </>
  )

  return (
    <>
      <AddProductBtn type="button" onClick={() => setShow(true)}>
        Ajouter un produit
      </AddProductBtn>
      <Modal show={show} setShow={setShow} title="Ajouter un produit" size="md" footer={footer}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormGrid>
            <InputContainer>
              <label htmlFor={inputId}>Nom du produit *</label>
              <input
                id={inputId}
                type="text"
                placeholder="Ex: iPhone 15"
                autoComplete="off"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </InputContainer>
            <BaseSelect
              label="Catégorie *"
              options={formOptions?.categories ?? []}
              value={formOptions?.categories.find((c) => c.value === categoryID)?.name ?? ""}
              onChange={(val) => {
                const found = formOptions?.categories.find((c) => c.name === val)
                if (found) setCategoryID(found.value ?? found.name)
              }}
              disabled={isLoading}
            />
            <BaseSelect
              label="Origine *"
              options={formOptions?.origins ?? []}
              value={formOptions?.origins.find((o) => o.value === originID)?.name ?? ""}
              onChange={(val) => {
                const found = formOptions?.origins.find((o) => o.name === val)
                if (found) setOriginID(found.value ?? found.name)
              }}
              disabled={isLoading}
            />
            <BaseSelect
              label="Territoire *"
              options={formOptions?.territories ?? []}
              value={formOptions?.territories.find((t) => t.value === territoryID)?.name ?? ""}
              onChange={(val) => {
                const found = formOptions?.territories.find((t) => t.name === val)
                if (found) setTerritoryID(found.value ?? found.name)
              }}
              disabled={isLoading}
            />
            {/* <BaseSelect
              label="Flux *"
              options={formOptions?.flux ?? []}
              value={formOptions?.flux.find((f) => f.value === fluxID)?.name ?? ""}
              onChange={(val) => {
                const found = formOptions?.flux.find((f) => f.name === val)
                if (found) setFluxID(found.value ?? found.name)
              }}
              disabled={isLoading}
            /> */}
          </FormGrid>
          {errors.length > 0 && (
            <ErrorContainer>
              {errors.map((error, index) => (
                <span key={index}>{error}</span>
              ))}
            </ErrorContainer>
          )}
        </form>
      </Modal>
    </>
  )
}
