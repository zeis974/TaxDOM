import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category } from "@taxdom/types"
import { useId, useMemo, useState } from "react"
import TaxBar from "@/components/Dashboard/Categories/TaxBar"
import {
  Badge,
  crudHandlers,
  DrawerSection,
  DrawerSectionDescription,
  DrawerSectionTitle,
  EntityCard,
  EntityDrawer,
  EntityDrawerActions,
  FormGrid,
} from "@/components/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import NomenclatureAutocomplete from "@/components/Forms/NomenclatureAutocomplete"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { api } from "@/lib/api"

type Props = {
  category: Category
  editable?: boolean
}

export default function CategoryCard({ category, editable = false }: Props) {
  const drawer = useCardDrawer()
  const [categoryName, setCategoryName] = useState(category.categoryName)
  const [nomenclatureCode, setNomenclatureCode] = useState(category.nomenclatureCode ?? "")
  const categoryNameId = useId()

  const queryClient = useQueryClient()
  const relatedProducts = category.relatedProducts ?? 0

  const updateMutation = useMutation(
    api.categories.update.mutationOptions(
      crudHandlers(queryClient, api.categories.index.pathKey(), {
        success: "Catégorie mise à jour",
        error: "Erreur lors de la mise à jour",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const deleteMutation = useMutation(
    api.categories.destroy.mutationOptions(
      crudHandlers(queryClient, api.categories.index.pathKey(), {
        success: "Catégorie supprimée",
        error: "Erreur lors de la suppression",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const isFormValid = useMemo(() => Boolean(categoryName.trim()), [categoryName])

  const handleCardClick = () => {
    setCategoryName(category.categoryName)
    setNomenclatureCode(category.nomenclatureCode ?? "")
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) drawer.setOpen(true)
    else drawer.closeDrawer()
  }

  const handleSave = () => {
    if (!isFormValid) return
    updateMutation.mutate({
      params: { id: category.categoryID },
      body: {
        categoryName: categoryName.trim(),
        taxID: category.taxID,
        nomenclatureCode: nomenclatureCode || null,
      },
    })
  }

  const handleDelete = () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: category.categoryID } })
  }

  return (
    <>
      <EntityCard
        title={category.categoryName}
        onClick={editable ? handleCardClick : undefined}
        badges={
          relatedProducts > 0 && (
            <Badge data-type="neutral">
              {relatedProducts} produit{relatedProducts !== 1 ? "s" : ""}
            </Badge>
          )
        }
      >
        {category.taxes && <TaxBar taxes={category.taxes} />}
      </EntityCard>

      {editable && (
        <EntityDrawer
          open={drawer.open}
          onOpenChange={handleOpenChange}
          title={category.categoryName}
          subtitle={`Catégorie · #${category.categoryID}`}
          meta={
            <>
              <span>
                {relatedProducts} produit{relatedProducts !== 1 ? "s" : ""} lié
                {relatedProducts !== 1 ? "s" : ""}
              </span>
              {category.taxes && (
                <span>
                  TVA {category.taxes.tva}% / OM {category.taxes.om}% / OMR {category.taxes.omr}%
                </span>
              )}
            </>
          }
          footer={
            <EntityDrawerActions
              onDelete={handleDelete}
              onSave={handleSave}
              saving={updateMutation.isPending}
              deleting={deleteMutation.isPending || drawer.isDeletingLocal}
              saveDisabled={!isFormValid}
              error={drawer.deleteError}
            />
          }
        >
          <DrawerSection>
            <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
            <DrawerSectionDescription>
              Mettez à jour le nom et le code de nomenclature de cette catégorie.
            </DrawerSectionDescription>
            <FormGrid>
              <InputContainer>
                <label htmlFor={categoryNameId}>Nom de la catégorie</label>
                <input
                  type="text"
                  id={categoryNameId}
                  placeholder="Nom de la catégorie"
                  autoComplete="off"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value.toUpperCase())}
                />
              </InputContainer>
              <NomenclatureAutocomplete
                label="Code SH (optionnel)"
                hint="Préfixe de nomenclature douanière (2-6 chiffres) pour cette catégorie."
                value={nomenclatureCode}
                onChange={(code) => setNomenclatureCode(code)}
                onClear={() => setNomenclatureCode("")}
                placeholder="Ex: 8517"
              />
            </FormGrid>
          </DrawerSection>

          {category.taxes && (
            <DrawerSection>
              <DrawerSectionTitle>Fiscalité</DrawerSectionTitle>
              <DrawerSectionDescription>
                Barème de taxes associé à cette catégorie.
              </DrawerSectionDescription>
              <TaxBar taxes={category.taxes} />
            </DrawerSection>
          )}
        </EntityDrawer>
      )}
    </>
  )
}
