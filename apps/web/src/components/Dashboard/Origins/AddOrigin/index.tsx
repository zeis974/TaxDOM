"use client"

import { useActionState, useId, useState } from "react"
import { createOrigin } from "@/actions/origins/createOrigin"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import type { Origin } from "@taxdom/types"

import {
  AddOriginBtn,
  AddOriginContainer,
  ErrorContainer,
  FieldDescription,
  OriginActions,
  SwitchInput,
  SwitchRow,
  SwitchTextContent,
} from "./AddOrigin.styled"

interface AddOriginProps {
  onAddOptimistic?: (origin: Origin) => void
}

export default function AddOrigin({ onAddOptimistic }: AddOriginProps) {
  const [show, setShow] = useState(false)
  const [originName, setOriginName] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isEU, setIsEU] = useState(false)

  const [state, dispatch, pending] = useActionState(
    async (prevState: { success: boolean; errors: string[] }, formData: FormData) => {
      const newOrigin = {
        originID: `temp-${Date.now()}`,
        name: (formData.get("originName") as string).toUpperCase(),
        available: formData.get("isActive") === "on",
        isEU: formData.get("isEU") === "on",
      }

      if (onAddOptimistic) {
        onAddOptimistic(newOrigin)
      }

      return await createOrigin(prevState, formData)
    },
    {
      success: false,
      errors: [],
    },
  )

  const originNameID = useId()
  const isActiveID = useId()
  const isEUID = useId()

  const isFormValid = originName.trim()
  const formErrors = state?.errors ?? []

  // Normalize origin name to uppercase
  const handleOriginNameChange = (value: string) => {
    setOriginName(value.toUpperCase())
  }

  // Reset form when modal closes
  const handleClose = () => {
    setShow(false)
    setOriginName("")
    setIsActive(true)
    setIsEU(false)
  }

  // Reset form on successful submission
  if (state?.success && show) {
    handleClose()
  }

  return (
    <>
      <AddOriginBtn type="button" onClick={() => setShow(true)}>
        Ajouter une origine
      </AddOriginBtn>
      <Modal {...{ open: show, setOpen: handleClose }}>
        <AddOriginContainer>
          <h2>Ajouter une origine</h2>
          <FieldDescription>
            Créez une nouvelle origine pour classifier les produits.
          </FieldDescription>
          <hr />
          <form action={dispatch}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Nom de l'origine */}
              <InputContainer>
                <label htmlFor={originNameID}>Nom de l'origine *</label>
                <input
                  type="text"
                  id={originNameID}
                  name="originName"
                  placeholder="Ex: FRANCE"
                  autoComplete="off"
                  required
                  value={originName}
                  onChange={(e) => handleOriginNameChange(e.target.value)}
                />
                <FieldDescription style={{ marginTop: "0.5rem" }}>
                  Le nom sera automatiquement converti en majuscules.
                </FieldDescription>
              </InputContainer>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {/* Origine activée */}
                <SwitchRow>
                  <SwitchTextContent>
                    <label htmlFor={isActiveID}>Origine activée</label>
                    <FieldDescription style={{ margin: 0 }}>
                      Rendre cette origine disponible pour les calculs.
                    </FieldDescription>
                  </SwitchTextContent>
                  <SwitchInput
                    type="checkbox"
                    id={isActiveID}
                    name="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </SwitchRow>

                {/* Union européenne */}
                <SwitchRow>
                  <SwitchTextContent>
                    <label htmlFor={isEUID}>Membre de l'Union Européenne</label>
                    <FieldDescription style={{ margin: 0 }}>
                      Appliquer les réglementations douanières de l'UE.
                    </FieldDescription>
                  </SwitchTextContent>
                  <SwitchInput
                    type="checkbox"
                    id={isEUID}
                    name="isEU"
                    checked={isEU}
                    onChange={(e) => setIsEU(e.target.checked)}
                  />
                </SwitchRow>
              </div>
            </div>

            <OriginActions>
              <ErrorContainer>
                {formErrors.length > 0 &&
                  formErrors.map((error, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: _
                    <span key={index}>{error}</span>
                  ))}
              </ErrorContainer>
              <Button
                type="button"
                onClick={handleClose}
                style={{ background: "transparent", border: "1px solid #ccc" }}
              >
                Annuler
              </Button>
              <Button type="submit" aria-disabled={!isFormValid || pending}>
                {pending ? "Création..." : "Créer l'origine"}
              </Button>
            </OriginActions>
          </form>
        </AddOriginContainer>
      </Modal>
    </>
  )
}
