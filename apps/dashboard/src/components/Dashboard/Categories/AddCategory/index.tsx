import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import { client } from "@/lib/api"
import {
  AddCategoryBtn,
  AddCategoryContainer,
  CategoryActions,
  ErrorContainer,
} from "./AddCategory.styled"

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

  const createMutation = useMutation({
    mutationFn: (body: { categoryName: string; tva: number; om: number; omr: number }) =>
      client.api.categories.store({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Catégorie créée avec succès")
      handleClose()
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    createMutation.mutate({
      categoryName: categoryName.trim(),
      tva: Number(tva),
      om: Number(om),
      omr: Number(omr),
    })
  }

  const errors = createMutation.error ? ["Erreur lors de la création"] : []

  return (
    <>
      <AddCategoryBtn type="button" onClick={() => setShow(true)}>
        Ajouter une catégorie
      </AddCategoryBtn>
      <Modal show={show} setShow={setShow}>
        <AddCategoryContainer>
          <h2>Ajouter une catégorie</h2>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
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
            <CategoryActions>
              <ErrorContainer>
                {errors.length > 0 &&
                  errors.map((error, index) => <span key={index}>{error}</span>)}
              </ErrorContainer>
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="button" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" aria-disabled={!isFormValid || createMutation.isPending}>
                  {createMutation.isPending ? "Création..." : "Créer la catégorie"}
                </Button>
              </div>
            </CategoryActions>
          </form>
        </AddCategoryContainer>
      </Modal>
    </>
  )
}
