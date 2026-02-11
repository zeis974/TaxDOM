"use client"

import { useActionState, useEffect, useId, useState } from "react"

import createCategory from "@/actions/categories/createCategory"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"

import {
  AddCategoryBtn,
  AddCategoryContainer,
  ErrorContainer,
  CategoryActions,
} from "./AddCategory.styled"

export default function AddCategory() {
  const [state, action, pending] = useActionState(createCategory, {
    success: false,
    errors: [],
  })
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [tva, setTva] = useState("")
  const [om, setOm] = useState("")
  const [omr, setOmr] = useState("")

  const categoryNameID = useId()
  const tvaID = useId()
  const omID = useId()
  const omrID = useId()

  const isFormValid = categoryName.trim() && tva !== "" && om !== "" && omr !== ""
  const formErrors = state?.errors ?? []

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (!show) {
      setCategoryName("")
      setTva("")
      setOm("")
      setOmr("")
    }
  }, [show])

  if (state?.success && show) {
    handleClose()
  }

  return (
    <>
      <AddCategoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter une catégorie
      </AddCategoryBtn>
      <Modal show={show} setShow={setShow}>
        <AddCategoryContainer>
          <h2>Ajouter une catégorie</h2>
          <hr />
          <form action={action} autoComplete="off">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <InputContainer>
                <label htmlFor={categoryNameID}>Nom de la catégorie *</label>
                <input
                  type="text"
                  id={categoryNameID}
                  name="categoryName"
                  placeholder="Ex: Électronique"
                  autoComplete="off"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </InputContainer>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <InputContainer>
                  <label htmlFor={tvaID}>TVA (%)</label>
                  <input
                    type="number"
                    id={tvaID}
                    name="tva"
                    placeholder="0"
                    min="0"
                    required
                    value={tva}
                    onChange={(e) => setTva(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor={omID}>OM (%)</label>
                  <input
                    type="number"
                    id={omID}
                    name="om"
                    placeholder="0"
                    min="0"
                    required
                    value={om}
                    onChange={(e) => setOm(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor={omrID}>OMR (%)</label>
                  <input
                    type="number"
                    id={omrID}
                    name="omr"
                    placeholder="0"
                    min="0"
                    required
                    value={omr}
                    onChange={(e) => setOmr(e.target.value)}
                  />
                </InputContainer>
              </div>
            </div>

            <CategoryActions>
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
                  {pending ? "Création..." : "Créer la catégorie"}
                </Button>
              </div>
            </CategoryActions>
          </form>
        </AddCategoryContainer>
      </Modal>
    </>
  )
}
