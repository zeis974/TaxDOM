"use client"

import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { useStore } from "@tanstack/react-form"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import type { TaxSimulatorFormLabel } from "@/components/services/ProductTaxesSimulator/types"
import Turnstile from "@/components/ui/Turnstile"
import { taxFormOpts, withForm } from "@/hooks/form"
import { searchProducts } from "@/lib/queries/products"

import { CaptchaContainer, ConvertButton, InputWrapper } from "./TaxSimulatorForm.styled"

interface TaxSimulatorFormProps {
  turnstileRef: React.RefObject<TurnstileInstance | null>
  onFocusInputChange: (value: TaxSimulatorFormLabel | null) => void
  originOptions: { name: string }[]
  territoryOptions: { name: string }[]
  onCaptureFormData: (formData: FormData) => void
  isPending: boolean
  hasResult: boolean
}

const TaxSimulatorForm = withForm({
  ...taxFormOpts,
  props: {
    turnstileRef: { current: null } as unknown as React.RefObject<TurnstileInstance | null>,
    onFocusInputChange: () => {},
    originOptions: [],
    territoryOptions: [],
    onCaptureFormData: () => {},
    isPending: false,
    hasResult: false,
  } as TaxSimulatorFormProps,
  render: function Render({
    form,
    turnstileRef,
    onFocusInputChange,
    originOptions,
    territoryOptions,
    onCaptureFormData,
    isPending,
    hasResult,
  }) {
    const queryValue = useStore(form.store, (s) => s.values.query)
    const [isScraping, setIsScraping] = useState(false)
    // URL that last triggered a "product not found" error — used to clear the
    // inline error as soon as the user edits the input.
    const notFoundUrlRef = useRef<string | null>(null)

    function looksLikeUrl(value: string): boolean {
      try {
        const url = new URL(value)
        return url.protocol === "http:" || url.protocol === "https:"
      } catch {
        return false
      }
    }

    const isUrl = looksLikeUrl(queryValue)

    // Clear the inline "Produit inexistant" error as soon as the user changes
    // the input value after a failed scrape.
    useEffect(() => {
      if (notFoundUrlRef.current !== null && queryValue !== notFoundUrlRef.current) {
        notFoundUrlRef.current = null
        form.setFieldMeta("query", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: undefined },
        }))
      }
    }, [queryValue, form])

    async function handleConvert() {
      setIsScraping(true)
      try {
        const res = await fetch("/api/scrape-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: queryValue }),
        })
        const data = await res.json()

        if (res.status === 422) {
          // Merchant not supported for URL parsing → inline hint near the label.
          notFoundUrlRef.current = queryValue
          form.setFieldMeta("query", (prev) => ({
            ...prev,
            errorMap: { ...prev.errorMap, onServer: "Site non compatible" },
          }))
          return
        }

        if (!res.ok) {
          toast.error("Impossible de lire cette page", {
            description: data.message ?? data.error,
          })
          return
        }

        form.setFieldValue("query", data.title)
      } catch {
        toast.error("Erreur lors de la lecture de la page")
      } finally {
        setIsScraping(false)
      }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const token = formData.get("cf-turnstile-response")

      if (!token) {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
        return
      }

      onCaptureFormData(formData)
      await form.handleSubmit()
    }

    return (
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <form.AppField name="query">
            {(field) => (
              <field.SelectField
                label="Produit"
                placeholder="Nom du produit ou lien marchand (https://…)"
                // Free-text autocomplete over the catalogue (semantic search via
                // the API). Skipped when the value is a URL — that path is handled
                // by the "Convertir" button instead.
                onSearch={isUrl ? undefined : searchProducts}
                onFocus={() => onFocusInputChange("query")}
                noResultsMessage="Aucun produit trouvé"
              />
            )}
          </form.AppField>
          {isUrl && (
            <ConvertButton type="button" onClick={handleConvert} disabled={isScraping}>
              {isScraping ? "…" : "Convertir"}
            </ConvertButton>
          )}
        </InputWrapper>
        <form.AppField name="origin">
          {(field) => (
            <field.SelectField
              label="Territoire d'origine"
              placeholder="FRANCE"
              options={originOptions}
              onFocus={() => onFocusInputChange("origin")}
            />
          )}
        </form.AppField>
        <form.AppField name="territory">
          {(field) => (
            <field.SelectField
              label="Territoire d'application"
              placeholder="REUNION"
              options={territoryOptions}
              onFocus={() => onFocusInputChange("territory")}
            />
          )}
        </form.AppField>
        <CaptchaContainer>
          <Turnstile ref={turnstileRef} />
        </CaptchaContainer>
        <form.AppForm>
          <form.SubscribeButton
            label={isPending ? "Chargement..." : "Rechercher"}
            disabled={isPending || hasResult}
          />
        </form.AppForm>
      </form>
    )
  },
})

export default TaxSimulatorForm
