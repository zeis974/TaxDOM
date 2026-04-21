import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { client } from "@/lib/api"
import {
  AddTransporterBtn,
  AddTransporterContainer,
  ErrorContainer,
  TransporterActions,
} from "./AddTransporter.styled"

export default function AddTransporter() {
  const [show, setShow] = useState(false)
  const [transporterName, setTransporterName] = useState("")
  const transporterNameID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (body: { transporterName: string; available: boolean }) =>
      client.api.transporters.store({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transporters"] })
      toast.success("Transporteur créé avec succès")
      handleClose()
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })

  const isFormValid = transporterName.trim() !== ""

  const resetForm = () => {
    setTransporterName("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    createMutation.mutate({ transporterName: transporterName.trim(), available: true })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddTransporterBtn type="button" onClick={() => setShow(true)}>
        Ajouter un transporteur
      </AddTransporterBtn>
      <Modal show={show} setShow={setShow}>
        <AddTransporterContainer>
          <h2>Ajouter un transporteur</h2>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
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
            <TransporterActions>
              <ErrorContainer>
                {errors.length > 0 &&
                  errors.map((error, index) => <span key={index}>{error}</span>)}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || createMutation.isPending}>
                  {createMutation.isPending ? "Création..." : "Créer le transporteur"}
                </Button>
              </div>
            </TransporterActions>
          </form>
        </AddTransporterContainer>
      </Modal>
    </>
  )
}
