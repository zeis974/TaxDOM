import { useId, useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { useEntityMutations } from "@/hooks/useEntityMutations"
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

  const { createMutation } = useEntityMutations({
    queryKey: ["territories"],
    messages: {
      create: "Territoire créé avec succès",
      update: "Territoire mis à jour",
      delete: "Territoire supprimé",
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

    await createMutation.mutateAsync({
      url: "/v1/admin/territories",
      body: { territoryName: territoryName.trim() },
    })
    handleClose()
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
