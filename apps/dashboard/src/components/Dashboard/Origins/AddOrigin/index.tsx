import { useId, useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { useEntityMutations } from "@/hooks/useEntityMutations"
import { AddOriginBtn, AddOriginContainer, ErrorContainer, OriginActions } from "./AddOrigin.styled"

export default function AddOrigin() {
  const [show, setShow] = useState(false)
  const [originName, setOriginName] = useState("")
  const [available, setAvailable] = useState(true)
  const [isEU, setIsEU] = useState(false)
  const originNameID = useId()

  const { createMutation } = useEntityMutations({
    queryKey: ["origins"],
    messages: {
      create: "Origine créée avec succès",
      update: "Origine mise à jour",
      delete: "Origine supprimée",
    },
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    await createMutation.mutateAsync({
      url: "/v1/admin/origins",
      body: { originName: originName.toUpperCase(), available, isEU },
    })
    handleClose()
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddOriginBtn type="button" onClick={() => setShow(true)}>
        Ajouter une origine
      </AddOriginBtn>
      <Modal show={show} setShow={setShow}>
        <AddOriginContainer>
          <h2>Ajouter une origine</h2>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
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
            <OriginActions>
              <ErrorContainer>
                {errors.length > 0 &&
                  errors.map((error, index) => <span key={index}>{error}</span>)}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || createMutation.isPending}>
                  {createMutation.isPending ? "Création..." : "Créer l'origine"}
                </Button>
              </div>
            </OriginActions>
          </form>
        </AddOriginContainer>
      </Modal>
    </>
  )
}
