import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
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

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      productName: productName.trim(),
      categoryID,
      originID,
      territoryID,
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddProductBtn type="button" onClick={() => setShow(true)}>
        Ajouter un produit
      </AddProductBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter un produit"
          onClose={handleClose}
          submitLabel="Créer le produit"
          onSubmit={handleSubmit}
          submitDisabled={!isFormValid || createMutation.isPending}
          submitLoading={createMutation.isPending}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            autoComplete="off"
          >
            <FormGrid>
              <InputContainer>
                <label htmlFor={inputId}>Nom du produit</label>
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
                label="Catégorie"
                options={formOptions?.categories ?? []}
                value={formOptions?.categories.find((c) => c.value === categoryID)?.name ?? ""}
                onChange={(val) => {
                  const found = formOptions?.categories.find((c) => c.name === val)
                  if (found) setCategoryID(found.value ?? found.name)
                }}
                disabled={isLoading}
              />
              <BaseSelect
                label="Origine"
                options={formOptions?.origins ?? []}
                value={formOptions?.origins.find((o) => o.value === originID)?.name ?? ""}
                onChange={(val) => {
                  const found = formOptions?.origins.find((o) => o.name === val)
                  if (found) setOriginID(found.value ?? found.name)
                }}
                disabled={isLoading}
              />
              <BaseSelect
                label="Territoire"
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
        </ModalCard>
      </Modal>
    </>
  )
}
