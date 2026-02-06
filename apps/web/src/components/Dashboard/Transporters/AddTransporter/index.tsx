"use client"

import { useActionState, useCallback, useEffect, useId, useState } from "react"

import { createTransporter } from "@/actions/transporters/createTransporter"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"

import {
  AddTransporterBtn,
  AddTransporterContainer,
  ErrorContainer,
  TransporterActions,
} from "./AddTransporter.styled"

const initialState = { success: false, errors: [] as string[] }

export default function AddTransporter() {
  const [state, action, pending] = useActionState(createTransporter, initialState)
  const [show, setShow] = useState(false)
  const [transporterName, setTransporterName] = useState("")

  const transporterNameID = useId()

  const isFormValid = transporterName.trim().length > 0
  const formErrors = state?.errors ?? []

  const resetForm = useCallback(() => {
    setTransporterName("")
  }, [])

  const handleOpen = useCallback(() => {
    resetForm()
    setShow(true)
  }, [resetForm])

  const handleClose = useCallback(() => {
    setShow(false)
    resetForm()
  }, [resetForm])

  // Close modal and reset on successful submission
  useEffect(() => {
    if (state?.success && show) {
      handleClose()
    }
  }, [state?.success, show, handleClose])

  return (
    <>
      <AddTransporterBtn type="button" onClick={handleOpen}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Ajouter un transporteur
      </AddTransporterBtn>
      <Modal open={show} setOpen={handleClose}>
        <AddTransporterContainer>
          <h2>Ajouter un transporteur</h2>
          <hr />
          <form action={action}>
            <InputContainer>
              <label htmlFor={transporterNameID}>Nom du transporteur</label>
              <input
                type="text"
                id={transporterNameID}
                name="transporter"
                placeholder="Ex: DHL, FedEx, UPS..."
                autoComplete="off"
                autoFocus
                required
                value={transporterName}
                onChange={(e) => setTransporterName(e.target.value)}
              />
            </InputContainer>
            <TransporterActions>
              {formErrors.length > 0 && (
                <ErrorContainer>
                  {formErrors.map((error, index) => (
                    <span key={index}>{error}</span>
                  ))}
                </ErrorContainer>
              )}
              <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                <Button type="submit" disabled={!isFormValid || pending}>
                  {pending ? "Création..." : "Créer le transporteur"}
                </Button>
              </div>
            </TransporterActions>
          </form>
        </AddTransporterContainer>
      </Modal>
    </>
  )
}
