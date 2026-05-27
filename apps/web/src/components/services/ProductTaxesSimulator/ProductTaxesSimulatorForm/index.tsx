"use client"

import { TurnstileInstance } from "@marsidev/react-turnstile"
import { toast } from "sonner"

import { searchProducts } from "@/lib/queries/products"
import Turnstile from "@/components/ui/Turnstile"

import type { TaxSimulatorFormLabel } from "@/components/services/ProductTaxesSimulator/types"
import { taxFormOpts, withForm } from "@/hooks/form"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

interface TaxSimulatorFormProps {
  turnstileRef: React.RefObject<TurnstileInstance | null>
  onFocusInputChange: (value: TaxSimulatorFormLabel | null) => void
  originOptions: { name: string }[]
  territoryOptions: { name: string }[]
  onSubmit: (formData: FormData) => void
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
    onSubmit: () => {},
    isPending: false,
    hasResult: false,
  } as TaxSimulatorFormProps,
  render: function Render({
    form,
    turnstileRef,
    onFocusInputChange,
    originOptions,
    territoryOptions,
    onSubmit,
    isPending,
    hasResult,
  }) {
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const token = formData.get("cf-turnstile-response")

      if (!token) {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
        return
      }

      form.handleSubmit()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit}>
        <form.AppField name="product">
          {(field) => (
            <field.SelectField
              label="Produit"
              placeholder="Rechercher un produit..."
              onSearch={searchProducts}
              onFocus={() => onFocusInputChange("product")}
              noResultsMessage="Aucun produit existant"
            />
          )}
        </form.AppField>
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
