import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import {
  AddEntityDrawer,
  BooleanToggle,
  crudHandlers,
  DrawerSection,
  DrawerSectionTitle,
  FormGrid,
  ToggleRow,
} from "@/components/Dashboard/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { api } from "@/lib/api"

export default function AddOrigin() {
  const [open, setOpen] = useState(false)
  const [originName, setOriginName] = useState("")
  const [available, setAvailable] = useState(true)
  const [isEU, setIsEU] = useState(false)

  const formId = useId()
  const originNameID = useId()
  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.origins.store.mutationOptions(
      crudHandlers(queryClient, api.origins.index.pathKey(), {
        success: "Origine créée avec succès",
        error: "Erreur lors de la création",
        onSuccess: () => handleClose(),
      }),
    ),
  )

  const isFormValid = originName.trim() !== ""

  const resetForm = () => {
    setOriginName("")
    setAvailable(true)
    setIsEU(false)
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
      body: { originName: originName.toUpperCase(), available, isEU },
    })
  }

  return (
    <AddEntityDrawer
      triggerLabel="Ajouter une origine"
      title="Ajouter une origine"
      subtitle="Nouvelle origine"
      open={open}
      onOpenChange={handleOpenChange}
      onTriggerClick={() => setOpen(true)}
      formId={formId}
      onSubmit={handleSubmit}
      submitLabel="Créer l'origine"
      submitting={createMutation.isPending}
      submitDisabled={!isFormValid}
      error={createMutation.error ? "Erreur lors de la création de l'origine." : null}
    >
      <DrawerSection>
        <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
        <FormGrid>
          <InputContainer>
            <label htmlFor={originNameID}>Nom de l'origine *</label>
            <input
              type="text"
              id={originNameID}
              placeholder="Ex: FRANCE"
              autoComplete="off"
              required
              value={originName}
              onChange={(e) => setOriginName(e.target.value.toUpperCase())}
            />
          </InputContainer>
        </FormGrid>
      </DrawerSection>

      <DrawerSection>
        <DrawerSectionTitle>Configuration</DrawerSectionTitle>
        <ToggleRow>
          <span>Disponibilité</span>
          <BooleanToggle
            value={available}
            onChange={setAvailable}
            trueLabel="Activée"
            falseLabel="Désactivée"
          />
        </ToggleRow>
        <ToggleRow>
          <span>Zone</span>
          <BooleanToggle value={isEU} onChange={setIsEU} trueLabel="UE" falseLabel="Non-UE" />
        </ToggleRow>
      </DrawerSection>
    </AddEntityDrawer>
  )
}
