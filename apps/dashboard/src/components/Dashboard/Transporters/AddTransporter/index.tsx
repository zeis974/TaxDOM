import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
import { api } from "@/lib/api"
import { AddTransporterBtn, ErrorContainer } from "./AddTransporter.styled"

export default function AddTransporter() {
  const [show, setShow] = useState(false)
  const [transporterName, setTransporterName] = useState("")
  const transporterNameID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.transporters.store.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: api.transporters.index.pathKey() })
        toast.success("Transporteur créé avec succès")
        handleClose()
      },
      onError: () => {
        toast.error("Erreur lors de la création")
      },
    }),
  )

  const isFormValid = transporterName.trim() !== ""

  const resetForm = () => {
    setTransporterName("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      body: { transporterName: transporterName.trim(), available: true },
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddTransporterBtn type="button" onClick={() => setShow(true)}>
        Ajouter un transporteur
      </AddTransporterBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter un transporteur"
          onClose={handleClose}
          submitLabel="Créer le transporteur"
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
