import { useId, useState } from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import {
  AddTransporterBtn,
  AddTransporterContainer,
  ErrorContainer,
  TransporterActions,
} from "./AddTransporter.styled"

interface AddTransporterProps {
  onCreate: (data: { transporterName: string }) => Promise<unknown>
  isPending: boolean
  errors: string[]
}

export default function AddTransporter({ onCreate, isPending, errors }: AddTransporterProps) {
  const [show, setShow] = useState(false)
  const [transporterName, setTransporterName] = useState("")
  const transporterNameID = useId()
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
    await onCreate({ transporterName: transporterName.trim() })
    if (!errors.length) handleClose()
  }

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
                <Button type="submit" aria-disabled={!isFormValid || isPending}>
                  {isPending ? "Création..." : "Créer le transporteur"}
                </Button>
              </div>
            </TransporterActions>
          </form>
        </AddTransporterContainer>
      </Modal>
    </>
  )
}
