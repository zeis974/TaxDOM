import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import {
  AddEntityDrawer,
  crudHandlers,
  DrawerSection,
  DrawerSectionDescription,
  DrawerSectionTitle,
  FormGrid,
} from "@/components/Dashboard/shared"
import { HintText, InputContainer } from "@/components/Forms/Input/Input.styled"
import NomenclatureAutocomplete from "@/components/Forms/NomenclatureAutocomplete"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
import { api } from "@/lib/api"
import { CharCount, OverrideGrid } from "./AddProduct.styled"

const PRODUCT_NAME_MAX = 100

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
  const tvaOverrideId = useId()
  const omOverrideId = useId()
  const omrOverrideId = useId()
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")
  const [nomenclatureCode, setNomenclatureCode] = useState("")
  const [tvaOverride, setTvaOverride] = useState("")
  const [omOverride, setOmOverride] = useState("")
  const [omrOverride, setOmrOverride] = useState("")
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
    setTvaOverride("")
    setOmOverride("")
    setOmrOverride("")
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
        ...(tvaOverride !== "" ? { tvaOverride: Number(tvaOverride) } : {}),
        ...(omOverride !== "" ? { omOverride: Number(omOverride) } : {}),
        ...(omrOverride !== "" ? { omrOverride: Number(omrOverride) } : {}),
      },
    })
  }

  const nameInvalid = touched.name && !productName.trim()
  const charWarning = productName.length >= PRODUCT_NAME_MAX * 0.9

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter un produit"
      title="Ajouter un produit"
      subtitle="Nouveau produit"
      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={() => setOpen(true)}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer le produit"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création du produit." : null}
    >
      <DrawerSection>
        <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
        <DrawerSectionDescription>
          Renseignez le nom commercial et le code de nomenclature douanière.
        </DrawerSectionDescription>
        <FormGrid>
          <InputContainer>
            <label htmlFor={inputId}>
              Nom du produit
              {nameInvalid && <span> — Ce champ est requis</span>}
            </label>
            <input
              id={inputId}
              type="text"
              placeholder="Ex: iPhone 15"
              autoComplete="off"
              required
              maxLength={PRODUCT_NAME_MAX}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-required="true"
              aria-invalid={nameInvalid}
              aria-describedby={`${inputId}-hint ${inputId}-count`}
            />
            <HintText id={`${inputId}-hint`}>
              Nom commercial du produit tel qu'il apparaîtra dans les simulations.
            </HintText>
            <CharCount id={`${inputId}-count`} data-warning={charWarning} aria-live="polite">
              {productName.length} / {PRODUCT_NAME_MAX}
            </CharCount>
          </InputContainer>
          <NomenclatureAutocomplete
            label="Code SH (optionnel)"
            hint="Code de nomenclature douanière. Doit être compatible avec le préfixe de la catégorie."
            value={nomenclatureCode}
            onChange={(code) => setNomenclatureCode(code)}
            onClear={() => setNomenclatureCode("")}
          />
        </FormGrid>
      </DrawerSection>

      <DrawerSection>
        <DrawerSectionTitle>Provenance</DrawerSectionTitle>
        <DrawerSectionDescription>
          Catégorie douanière, origine et territoire de destination.
        </DrawerSectionDescription>
        <FormGrid>
          <BaseSelect
            id={categoryId}
            label="Catégorie"
            hint="Classification douanière du produit."
            options={formOptions?.categories ?? []}
            value={formOptions?.categories.find((c) => c.value === categoryID)?.name ?? ""}
            onChange={(val) => {
              const found = formOptions?.categories.find((c) => c.name === val)
              if (found) setCategoryID(found.value ?? found.name)
            }}
            onBlur={() => setTouched((t) => ({ ...t, category: true }))}
            disabled={isLoading}
            errors={touched.category && !categoryID ? ["Requis"] : []}
          />
          <BaseSelect
            id={originId}
            label="Origine"
            hint="Pays de fabrication ou de provenance du produit."
            options={formOptions?.origins ?? []}
            value={formOptions?.origins.find((o) => o.value === originID)?.name ?? ""}
            onChange={(val) => {
              const found = formOptions?.origins.find((o) => o.name === val)
              if (found) setOriginID(found.value ?? found.name)
            }}
            onBlur={() => setTouched((t) => ({ ...t, origin: true }))}
            disabled={isLoading}
            errors={touched.origin && !originID ? ["Requis"] : []}
          />
          <BaseSelect
            id={territoryId}
            label="Territoire"
            hint="Zone géographique de destination et de taxation."
            options={formOptions?.territories ?? []}
            value={formOptions?.territories.find((t) => t.value === territoryID)?.name ?? ""}
            onChange={(val) => {
              const found = formOptions?.territories.find((t) => t.name === val)
              if (found) setTerritoryID(found.value ?? found.name)
            }}
            onBlur={() => setTouched((t) => ({ ...t, territory: true }))}
            disabled={isLoading}
            errors={touched.territory && !territoryID ? ["Requis"] : []}
          />
        </FormGrid>
      </DrawerSection>

      <DrawerSection>
        <DrawerSectionTitle>Options fiscales avancées</DrawerSectionTitle>
        <DrawerSectionDescription>
          Surcharges optionnelles des taux TVA, OM et OMR. Laissez vide pour hériter de la
          catégorie.
        </DrawerSectionDescription>
        <OverrideGrid>
          <InputContainer>
            <label htmlFor={tvaOverrideId}>TVA override (%)</label>
            <input
              id={tvaOverrideId}
              type="number"
              placeholder="Hérite"
              min="0"
              max="100"
              step="any"
              value={tvaOverride}
              onChange={(e) => setTvaOverride(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor={omOverrideId}>OM override (%)</label>
            <input
              id={omOverrideId}
              type="number"
              placeholder="Hérite"
              min="0"
              max="100"
              step="any"
              value={omOverride}
              onChange={(e) => setOmOverride(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor={omrOverrideId}>OMR override (%)</label>
            <input
              id={omrOverrideId}
              type="number"
              placeholder="Hérite"
              min="0"
              max="100"
              step="any"
              value={omrOverride}
              onChange={(e) => setOmrOverride(e.target.value)}
            />
          </InputContainer>
        </OverrideGrid>
      </DrawerSection>
    </AddEntityDrawer>
  )
}
