import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { client } from "@/lib/api"
import {
  AddTerritoryBtn,
  AddTerritoryContainer,
  ErrorContainer,
  TerritoryActions,
} from "./AddTerritory.styled"

export default function AddTerritory() {
  const [show, setShow] = useState(false)
  const [territoryName, setTerritoryName] = useState("")
  const territoryNameID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (body: { territoryName: string; available: boolean }) =>
      client.api.territories.store({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["territories"] })
      toast.success("Territoire créé avec succès")
      handleClose()
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })

  const isFormValid = territoryName.trim() !== ""

  const resetForm = () => {
    setTerritoryName("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    createMutation.mutate({ territoryName: territoryName.trim(), available: true })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddTerritoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter un territoire
      </AddTerritoryBtn>
      <Modal show={show} setShow={setShow}>
        <AddTerritoryContainer>
          <h2>Ajouter un territoire</h2>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
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
            <TerritoryActions>
              <ErrorContainer>
                {errors.length > 0 &&
                  errors.map((error, index) => <span key={index}>{error}</span>)}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || createMutation.isPending}>
                  {createMutation.isPending ? "Création..." : "Créer le territoire"}
                </Button>
              </div>
            </TerritoryActions>
          </form>
        </AddTerritoryContainer>
      </Modal>
    </>
  )
}
