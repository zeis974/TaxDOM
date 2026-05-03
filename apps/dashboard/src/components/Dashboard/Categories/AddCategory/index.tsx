import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import ModalCard from "@/components/Modal/ModalCard"
import { api } from "@/lib/api"
import { AddCategoryBtn, ErrorContainer } from "./AddCategory.styled"

export default function AddCategory() {
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [tva, setTva] = useState("")
  const [om, setOm] = useState("")
  const [omr, setOmr] = useState("")

  const categoryNameID = useId()
  const tvaID = useId()
  const omID = useId()
  const omrID = useId()

  const queryClient = useQueryClient()

  const createMutation = useMutation(
    api.categories.store.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: api.categories.index.pathKey() })
        toast.success("Catégorie créée avec succès")
        handleClose()
      },
      onError: () => {
        toast.error("Erreur lors de la création")
      },
    }),
  )

  const isFormValid = categoryName.trim() && tva !== "" && om !== "" && omr !== ""

  const resetForm = () => {
    setCategoryName("")
    setTva("")
    setOm("")
    setOmr("")
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    createMutation.mutate({
      body: {
        categoryName: categoryName.trim(),
        tva: Number(tva),
        om: Number(om),
        omr: Number(omr),
      },
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddCategoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter une catégorie
      </AddCategoryBtn>
      <Modal show={show} setShow={setShow}>
        <ModalCard
          title="Ajouter une catégorie"
          onClose={handleClose}
          submitLabel="Créer la catégorie"
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
                <label htmlFor={categoryNameID}>Nom de la catégorie *</label>
                <input
                  type="text"
                  id={categoryNameID}
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
                    placeholder="0"
                    min="0"
                    step="any"
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
                    placeholder="0"
                    min="0"
                    step="any"
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
                    placeholder="0"
                    min="0"
                    step="any"
                    required
                    value={omr}
                    onChange={(e) => setOmr(e.target.value)}
                  />
                </InputContainer>
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
