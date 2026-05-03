import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
import { api } from "@/lib/api"
import { AddTerritoryBtn, ErrorContainer } from "./AddTerritory.styled"

export default function AddTerritory() {
  const [show, setShow] = useState(false)
  const [territoryName, setTerritoryName] = useState("")
  const territoryNameID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.territories.store.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: api.territories.index.pathKey() })
        toast.success("Territoire créé avec succès")
        handleClose()
      },
      onError: () => {
        toast.error("Erreur lors de la création")
      },
    }),
  )

  const isFormValid = territoryName.trim() !== ""

  const resetForm = () => {
    setTerritoryName("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      body: { territoryName: territoryName.trim(), available: true },
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddTerritoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter un territoire
      </AddTerritoryBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter un territoire"
          onClose={handleClose}
          submitLabel="Créer le territoire"
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
