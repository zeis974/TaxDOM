import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import {
  AddEntityDrawer,
  crudHandlers,
  FormGrid,
} from "@/components/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { api } from "@/lib/api"

export default function AddCategory() {
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [tva, setTva] = useState("")
  const [om, setOm] = useState("")
  const [omr, setOmr] = useState("")

  const formId = useId()
  const categoryNameID = useId()
  const tvaID = useId()
  const omID = useId()
  const omrID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.categories.store.mutationOptions(
      crudHandlers(queryClient, api.categories.index.pathKey(), {
        success: "Catégorie créée avec succès",
        error: "Erreur lors de la création",
        onSuccess: () => handleClose(),
      }),
    ),
  )

  const isFormValid = categoryName.trim() && tva !== "" && om !== "" && omr !== ""

  const resetForm = () => {
    setCategoryName("")
    setTva("")
    setOm("")
    setOmr("")
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
        categoryName: categoryName.trim(),
        tva: Number(tva),
        om: Number(om),
        omr: Number(omr),
      },
    })
  }

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter une catégorie"
      title="Ajouter une catégorie"
      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={() => setOpen(true)}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer la catégorie"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création de la catégorie." : null}
    >
      <FormGrid>
        <InputContainer>
          <label htmlFor={categoryNameID}>Nom de la catégorie *</label>
          <input
            type="text"
            id={categoryNameID}
            placeholder="Ex: Électronique"
            autoComplete="off"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value.toUpperCase())}
          />
        </InputContainer>
      </FormGrid>

      <FormGrid>
        <InputContainer>
          <label htmlFor={tvaID}>TVA (%)</label>
          <input
            type="number"
            id={tvaID}
            placeholder="0"
            min="0"
            step="any"
            required
            value={tva}
            onChange={(e) => setTva(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor={omID}>OM (%)</label>
          <input
            type="number"
            id={omID}
            placeholder="0"
            min="0"
            step="any"
            required
            value={om}
            onChange={(e) => setOm(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor={omrID}>OMR (%)</label>
          <input
            type="number"
            id={omrID}
            placeholder="0"
            min="0"
            step="any"
            required
            value={omr}
            onChange={(e) => setOmr(e.target.value)}
          />
        </InputContainer>
      </FormGrid>
    </AddEntityDrawer>
  )
}
