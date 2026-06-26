import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useId, useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import NomenclatureAutocomplete from "@/components/Forms/NomenclatureAutocomplete"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import { AddEntityDrawer, crudHandlers, FormGrid } from "@/components/shared"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
import { api } from "@/lib/api"

type TouchedFields = {
  name: boolean
  category: boolean
  origin: boolean
  territory: boolean
}

const INITIAL_TOUCHED: TouchedFields = {
  name: false,
  category: false,
  origin: false,
  territory: false,
}

export default function AddProduct() {
  const [open, setOpen] = useState(false)
  const { data: formOptions, isLoading } = useProductFormOptions()
  const formId = useId()
  const inputId = useId()
  const categoryId = useId()
  const originId = useId()
  const territoryId = useId()
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")
  const [nomenclatureCode, setNomenclatureCode] = useState("")
  const [touched, setTouched] = useState<TouchedFields>(INITIAL_TOUCHED)

  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.products.store.mutationOptions(
      crudHandlers(queryClient, api.products.index.pathKey(), {
        success: "Produit créé avec succès",
        error: "Erreur lors de la création",
        onSuccess: () => handleClose(),
      }),
    ),
  )

  const isFormValid = Boolean(productName.trim() && categoryID && originID && territoryID)

  const resetForm = () => {
    setProductName("")
    setCategoryID("")
    setOriginID("")
    setTerritoryID("")
    setNomenclatureCode("")
    setTouched(INITIAL_TOUCHED)
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      body: {
        productName: productName.trim(),
        categoryID,
        originID,
        territoryID,
        ...(nomenclatureCode ? { nomenclatureCode } : {}),
      },
    })
  }

  const nameInvalid = touched.name && !productName.trim()

  const handleTriggerClick = useCallback(() => setOpen(true), [])

  const handleProductNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value.toUpperCase()),
    [],
  )

  const handleProductNameBlur = useCallback(() => setTouched((t) => ({ ...t, name: true })), [])

  const handleCategoryChange = useCallback((val: string) => setCategoryID(val), [])
  const handleCategoryBlur = useCallback(() => setTouched((t) => ({ ...t, category: true })), [])

  const handleOriginChange = useCallback((val: string) => setOriginID(val), [])
  const handleOriginBlur = useCallback(() => setTouched((t) => ({ ...t, origin: true })), [])

  const handleTerritoryChange = useCallback((val: string) => setTerritoryID(val), [])
  const handleTerritoryBlur = useCallback(() => setTouched((t) => ({ ...t, territory: true })), [])

  const handleNomenclatureChange = useCallback((code: string) => setNomenclatureCode(code), [])
  const handleNomenclatureClear = useCallback(() => setNomenclatureCode(""), [])

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter un produit"
      title="Ajouter un produit"
      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={handleTriggerClick}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer le produit"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création du produit." : null}
    >
      <FormGrid>
        <InputContainer>
          <label htmlFor={inputId}>
            Nom du produit
            {nameInvalid ? <span>Requis</span> : null}
          </label>
          <input
            id={inputId}
            type="text"
            placeholder="Smartphone"
            autoComplete="off"
            required
            value={productName}
            onChange={handleProductNameChange}
            onBlur={handleProductNameBlur}
            aria-required="true"
            aria-invalid={nameInvalid}
          />
        </InputContainer>
        <NomenclatureAutocomplete
          label="Code SH"
          value={nomenclatureCode}
          onChange={handleNomenclatureChange}
          onClear={handleNomenclatureClear}
        />
        <BaseSelect
          id={categoryId}
          label="Catégorie"
          placeholder="Sélectionner une catégorie"
          options={formOptions?.categories ?? []}
          value={categoryID}
          onChange={handleCategoryChange}
          onBlur={handleCategoryBlur}
          disabled={isLoading}
          errors={touched.category && !categoryID ? ["Requis"] : []}
        />
        <BaseSelect
          id={originId}
          label="Origine"
          placeholder="Sélectionner une origine"
          options={formOptions?.origins ?? []}
          value={originID}
          onChange={handleOriginChange}
          onBlur={handleOriginBlur}
          disabled={isLoading}
          errors={touched.origin && !originID ? ["Requis"] : []}
        />
        <BaseSelect
          id={territoryId}
          label="Territoire"
          placeholder="Sélectionner un territoire"
          options={formOptions?.territories ?? []}
          value={territoryID}
          onChange={handleTerritoryChange}
          onBlur={handleTerritoryBlur}
          disabled={isLoading}
          errors={touched.territory && !territoryID ? ["Requis"] : []}
        />
      </FormGrid>
    </AddEntityDrawer>
  )
}
