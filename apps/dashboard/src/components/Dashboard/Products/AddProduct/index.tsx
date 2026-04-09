import type { SelectOption } from "@taxdom/types"
import { useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { useEntityMutations } from "@/hooks/useEntityMutations"
import {
  AddProductBtn,
  AddProductContainer,
  ErrorContainer,
  ProductActions,
} from "./AddProduct.styled"

interface FormData {
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
  flux: SelectOption[]
  taxes: { taxID: string; tva: number; om: number; omr: number }[]
}

interface AddProductProps {
  formData: FormData
}

export default function AddProduct({ formData }: AddProductProps) {
  const [show, setShow] = useState(false)
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

  return (
    <>
      <AddProductBtn type="button" onClick={() => setShow(true)}>
        Ajouter un produit
      </AddProductBtn>
      <Modal show={show} setShow={setShow}>
        <AddProductContainer>
          <h2>Ajouter un produit</h2>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <InputContainer>
                <label>Nom du produit *</label>
                <input
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
                options={formData.categories}
                value={formData.categories.find((c) => c.value === categoryID)?.name ?? ""}
                onChange={(val) => {
                  const found = formData.categories.find((c) => c.name === val)
                  if (found) setCategoryID(found.value ?? found.name)
                }}
              />
              <BaseSelect
                label="Origine *"
                options={formData.origins}
                value={formData.origins.find((o) => o.value === originID)?.name ?? ""}
                onChange={(val) => {
                  const found = formData.origins.find((o) => o.name === val)
                  if (found) setOriginID(found.value ?? found.name)
                }}
              />
              <BaseSelect
                label="Territoire *"
                options={formData.territories}
                value={formData.territories.find((t) => t.value === territoryID)?.name ?? ""}
                onChange={(val) => {
                  const found = formData.territories.find((t) => t.name === val)
                  if (found) setTerritoryID(found.value ?? found.name)
                }}
              />
              <BaseSelect
                label="Flux *"
                options={formData.flux}
                value={formData.flux.find((f) => f.value === fluxID)?.name ?? ""}
                onChange={(val) => {
                  const found = formData.flux.find((f) => f.name === val)
                  if (found) setFluxID(found.value ?? found.name)
                }}
              />
            </div>
            <ProductActions>
              <ErrorContainer>
                {errors.length > 0 &&
                  errors.map((error, index) => <span key={index}>{error}</span>)}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || createMutation.isPending}>
                  {createMutation.isPending ? "Création..." : "Créer le produit"}
                </Button>
              </div>
            </ProductActions>
          </form>
        </AddProductContainer>
      </Modal>
    </>
  )
}
