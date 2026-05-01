import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
import { api } from "@/lib/api"
import { AddOriginBtn, ErrorContainer } from "./AddOrigin.styled"

export default function AddOrigin() {
  const [show, setShow] = useState(false)
  const [originName, setOriginName] = useState("")
  const [available, setAvailable] = useState(true)
  const [isEU, setIsEU] = useState(false)
  const originNameID = useId()
  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.origins.store.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: api.origins.index.pathKey() })
        toast.success("Origine créée avec succès")
        handleClose()
      },
      onError: () => {
        toast.error("Erreur lors de la création")
      },
    }),
  )

  const isFormValid = originName.trim() !== ""

  const resetForm = () => {
    setOriginName("")
    setAvailable(true)
    setIsEU(false)
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      body: { originName: originName.toUpperCase(), available, isEU },
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddOriginBtn type="button" onClick={() => setShow(true)}>
        Ajouter une origine
      </AddOriginBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter une origine"
          onClose={handleClose}
          submitLabel="Créer l'origine"
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
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              <div style={{ display: "flex", gap: "2rem" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                  />
                  Activée
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    checked={isEU}
                    onChange={(e) => setIsEU(e.target.checked)}
                  />
                  Membre UE
                </label>
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
