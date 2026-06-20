import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import {
  AddEntityDrawer,
  crudHandlers,
  FormGrid,
} from "@/components/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { api } from "@/lib/api"

export default function AddTransporter() {
  const [open, setOpen] = useState(false)
  const [transporterName, setTransporterName] = useState("")

  const formId = useId()
  const transporterNameID = useId()
  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.transporters.store.mutationOptions(
      crudHandlers(queryClient, api.transporters.index.pathKey(), {
        success: "Transporteur créé avec succès",
        error: "Erreur lors de la création",
        onSuccess: () => handleClose(),
      }),
    ),
  )

  const isFormValid = transporterName.trim() !== ""

  const resetForm = () => {
    setTransporterName("")
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
      body: { transporterName: transporterName.trim(), available: true },
    })
  }

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter un transporteur"
      title="Ajouter un transporteur"

      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={() => setOpen(true)}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer le transporteur"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création du transporteur." : null}
    >
      <FormGrid>
          <InputContainer>
            <label htmlFor={transporterNameID}>Nom du transporteur *</label>
            <input
              type="text"
              id={transporterNameID}
              placeholder="Ex: COLISSIMO"
              autoComplete="off"
              required
              value={transporterName}
              onChange={(e) => setTransporterName(e.target.value.toUpperCase())}
            />
          </InputContainer>
        </FormGrid>
    </AddEntityDrawer>
  )
}
