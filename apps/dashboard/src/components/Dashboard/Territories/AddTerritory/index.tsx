import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import {
  AddEntityDrawer,
  crudHandlers,
  FormGrid,
} from "@/components/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { api } from "@/lib/api"

export default function AddTerritory() {
  const [open, setOpen] = useState(false)
  const [territoryName, setTerritoryName] = useState("")

  const formId = useId()
  const territoryNameID = useId()
  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.territories.store.mutationOptions(
      crudHandlers(queryClient, api.territories.index.pathKey(), {
        success: "Territoire créé avec succès",
        error: "Erreur lors de la création",
        onSuccess: () => handleClose(),
      }),
    ),
  )

  const isFormValid = territoryName.trim() !== ""

  const resetForm = () => {
    setTerritoryName("")
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
      body: { territoryName: territoryName.trim(), available: true },
    })
  }

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter un territoire"
      title="Ajouter un territoire"

      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={() => setOpen(true)}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer le territoire"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création du territoire." : null}
    >
      <FormGrid>
          <InputContainer>
            <label htmlFor={territoryNameID}>Nom du territoire *</label>
            <input
              type="text"
              id={territoryNameID}
              placeholder="Ex: France métropolitaine"
              autoComplete="off"
              required
              value={territoryName}
              onChange={(e) => setTerritoryName(e.target.value)}
            />
          </InputContainer>
        </FormGrid>
    </AddEntityDrawer>
  )
}
