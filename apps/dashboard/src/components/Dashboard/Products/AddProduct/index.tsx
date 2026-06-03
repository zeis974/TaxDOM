import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useId, useState } from "react"
import { toast } from "sonner"

import { HintText, InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import NomenclatureAutocomplete from "@/components/Forms/NomenclatureAutocomplete"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
import { AddProductBtn, CharCount, ErrorContainer, FormGrid } from "./AddProduct.styled"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
import { client } from "@/lib/api"

const PRODUCT_NAME_MAX = 100

const PackagePlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16.5 9.4L7.55 4M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 16.5V21M18.5 18.5H23.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 8L12 13L21 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type TouchedFields = {
  name: boolean
  category: boolean
  origin: boolean
  territory: boolean
}

export default function AddProduct() {
  const [show, setShow] = useState(false)
  const { data: formOptions, isLoading } = useProductFormOptions()
  const inputId = useId()
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")
  const [nomenclatureCode, setNomenclatureCode] = useState("")
  const [tvaOverride, setTvaOverride] = useState("")
  const [omOverride, setOmOverride] = useState("")
  const [omrOverride, setOmrOverride] = useState("")
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    category: false,
    origin: false,
    territory: false,
  })

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
    setNomenclatureCode("")
    setTvaOverride("")
    setOmOverride("")
    setOmrOverride("")
    setTouched({ name: false, category: false, origin: false, territory: false })
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
      ...(nomenclatureCode ? { nomenclatureCode } : {}),
      ...(tvaOverride !== "" ? { tvaOverride: Number(tvaOverride) } : {}),
      ...(omOverride !== "" ? { omOverride: Number(omOverride) } : {}),
      ...(omrOverride !== "" ? { omrOverride: Number(omrOverride) } : {}),
    })
  }

  useEffect(() => {
    if (!show) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && isFormValid && !createMutation.isPending) {
        handleSubmit()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [show, isFormValid, createMutation.isPending])

  const nameInvalid = touched.name && !productName.trim()
  const charWarning = productName.length >= PRODUCT_NAME_MAX * 0.9

  const errors = createMutation.error ? ["Erreur lors de la création du produit."] : []

  return (
    <>
      <AddProductBtn type="button" onClick={() => setShow(true)}>
        Ajouter un produit
      </AddProductBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter un produit"
          description="Renseignez les informations pour référencer ce produit dans le système."
          icon={<PackagePlusIcon />}
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
                <HintText id={`${inputId}-hint`}>Nom commercial du produit tel qu'il apparaîtra dans les simulations.</HintText>
                <CharCount
                  id={`${inputId}-count`}
                  data-warning={charWarning}
                  aria-live="polite"
                >
                  {productName.length} / {PRODUCT_NAME_MAX}
                </CharCount>
              </InputContainer>
              <BaseSelect
                id="add-product-category"
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
                id="add-product-origin"
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
                id="add-product-territory"
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

            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <NomenclatureAutocomplete
                label="Code SH (optionnel)"
                hint="Code de nomenclature douanière. Doit être compatible avec le préfixe de la catégorie."
                value={nomenclatureCode}
                onChange={(code) => setNomenclatureCode(code)}
                onClear={() => setNomenclatureCode("")}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <InputContainer>
                  <label>TVA override (%)</label>
                  <input
                    type="number"
                    placeholder="Hérite de la catégorie"
                    min="0"
                    max="100"
                    step="any"
                    value={tvaOverride}
                    onChange={(e) => setTvaOverride(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <label>OM override (%)</label>
                  <input
                    type="number"
                    placeholder="Hérite de la catégorie"
                    min="0"
                    max="100"
                    step="any"
                    value={omOverride}
                    onChange={(e) => setOmOverride(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <label>OMR override (%)</label>
                  <input
                    type="number"
                    placeholder="Hérite de la catégorie"
                    min="0"
                    max="100"
                    step="any"
                    value={omrOverride}
                    onChange={(e) => setOmrOverride(e.target.value)}
                  />
                </InputContainer>
              </div>
            </div>

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
