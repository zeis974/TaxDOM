import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { AddProductBtn, ErrorContainer, FormGrid } from "./AddProduct.styled"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
import { client } from "@/lib/api"

export default function AddProduct() {
  const [show, setShow] = useState(false)
  const { data: formOptions, isLoading } = useProductFormOptions()
  const inputId = useId()
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (body: {
      productName: string
      categoryID: string
      originID: string
      territoryID: string
    }) => client.api.products.store({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produit créé avec succès")
      handleClose()
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })

  const isFormValid = productName.trim() && categoryID && originID && territoryID

  const resetForm = () => {
    setProductName("")
    setCategoryID("")
    setOriginID("")
    setTerritoryID("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    createMutation.mutate({
      productName: productName.trim(),
      categoryID,
      originID,
      territoryID,
    })
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
