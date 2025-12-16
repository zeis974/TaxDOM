"use client"

import { useActionState, useId, useState } from "react"

import { createTerritory } from "@/actions/territories/createTerritory"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"

import {
  AddTerritoryBtn,
  AddTerritoryContainer,
  ErrorContainer,
  TerritoryActions,
} from "./AddTerritory.styled"

export default function AddTerritory() {
  const [state, action, pending] = useActionState(createTerritory, {
    success: false,
    errors: [],
  })
  const [show, setShow] = useState(false)
  const [territoryName, setTerritoryName] = useState("")

  const territoryNameID = useId()

  const isFormValid = territoryName.trim()
  const formErrors = state?.errors ?? []

  // Reset form when modal closes
  const handleClose = () => {
    setShow(false)
    setTerritoryName("")
  }

  // Reset form on successful submission
  if (state?.success && show) {
    handleClose()
  }

  return (
    <>
      <AddTerritoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter un territoire
      </AddTerritoryBtn>
      <Modal {...{ open: show, setOpen: handleClose }}>
        <AddTerritoryContainer>
          <h2>Ajouter un territoire</h2>
          <hr />
          <form action={action}>
            <InputContainer>
              <label htmlFor={territoryNameID}>Nom du territoire</label>
              <input
                type="text"
                id={territoryNameID}
                name="territory"
                placeholder="GUADELOUPE"
                autoComplete="off"
                required
                value={territoryName}
                onChange={(e) => setTerritoryName(e.target.value)}
              />
            </InputContainer>
            <TerritoryActions>
              <ErrorContainer>
                {formErrors.length > 0 &&
                  formErrors.map((error, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: _
                    <span key={index}>{error}</span>
                  ))}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || pending}>
                  {pending ? "Création..." : "Créer le territoire"}
                </Button>
              </div>
            </TerritoryActions>
          </form>
        </AddTerritoryContainer>
      </Modal>
    </>
  )
}
