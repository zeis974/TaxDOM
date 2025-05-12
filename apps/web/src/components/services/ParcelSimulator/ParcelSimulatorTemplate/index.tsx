import { useSuspenseQuery } from "@tanstack/react-query"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { useEffect, useMemo, useState } from "react"

import { CloseIcon, NoFaceIcon } from "@/components/Icons"
import { fetchTemplates } from "@/lib/fetchTemplate"
import {
  ActionContainer,
  Backdrop,
  Container,
  ErrorContainer,
  TemplateContainer,
} from "./ParcelSimulatorTemplate.styled"

// TODO: fix any types
export default function ParcelSimulatorTemplate({
  form,
}: {
  form: any
}) {
  const [open, setOpen] = useState(false)
  const [selectedTemplateID, setSelectedTemplateID] = useState<number | undefined>(undefined)

  const { data, isError } = useSuspenseQuery(fetchTemplates)

  const selectedTemplate = useMemo(
    () => data?.find((t) => t.templateID === selectedTemplateID),
    [data, selectedTemplateID],
  )

  const handleSubmit = () => {
    if (!selectedTemplate) {
      console.error("Aucun template sélectionné")
      return
    }

    try {
      const productsToAdd = selectedTemplate.products.map((product) => ({
        name: product.productName,
        price: "" as unknown as number,
      }))

      form.setFieldValue("products", productsToAdd)
      setOpen(false)
    } catch (error) {
      console.error("Erreur lors de l'ajout des produits :", error)
    }
  }

  useEffect(() => {
    const firstTemplate = data?.[0]
    if (firstTemplate && !selectedTemplateID) {
      setSelectedTemplateID(firstTemplate.templateID)
    }
  }, [data, selectedTemplateID])

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)}>
        Template
      </button>
      <AnimatePresence>
        {open && (
          <>
            <Container
              initial={{ opacity: 0, scale: 0.98, translate: "-50% -50%" }}
              animate={{ opacity: 1, scale: 1, translate: "-50% -50%" }}
              exit={{ opacity: 0, scale: 0.98, translate: "-50% -50%" }}
              transition={{ duration: 0.15 }}
            >
              <div>
                <div>
                  <h3>Template de produit</h3>
                  <CloseIcon onClick={() => setOpen(false)} />
                </div>
                <p>Gagnez du temps en ajoutant des ensembles de produits prédéfinis</p>
                <hr />
                {isError && (
                  <ErrorContainer>
                    <NoFaceIcon />
                    <span>Une erreur s'est produite lors de la récupération des données</span>
                  </ErrorContainer>
                )}
                {!isError && (
                  <TemplateContainer>
                    <div>
                      {data?.map((template) => (
                        <div
                          key={template.templateID}
                          onClick={() => setSelectedTemplateID(template.templateID)}
                          onKeyUp={() => setSelectedTemplateID(template.templateID)}
                          data-selected={template.templateID === selectedTemplateID}
                        >
                          <span>{template.templateName}</span>
                        </div>
                      ))}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      {selectedTemplate && (
                        <m.div
                          key={selectedTemplate.templateID}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.1, ease: "easeOut" }}
                        >
                          {selectedTemplate?.products.map((product) => (
                            <span key={product.productID}>{product.productName}</span>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </TemplateContainer>
                )}
                <ActionContainer>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                  >
                    Ajouter
                  </button>
                </ActionContainer>
              </div>
            </Container>
            <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </>
        )}
      </AnimatePresence>
    </>
  )
}
