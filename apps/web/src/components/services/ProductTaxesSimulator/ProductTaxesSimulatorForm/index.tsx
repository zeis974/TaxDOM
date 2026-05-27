"use client"

import { TurnstileInstance } from "@marsidev/react-turnstile"
import { toast } from "sonner"

import { searchProducts } from "@/lib/products"

import Turnstile from "@/lib/Turnstile"

import type { TaxSimulatorFormLabel } from "@/components/services/ProductTaxesSimulator/types"
import { useAppForm } from "@/hooks/form"
import { Select } from "@/components/Forms"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

interface TaxSimulatorFormProps {
  form: ReturnType<typeof useAppForm>
  turnstileRef: React.RefObject<TurnstileInstance | null>
  onFocusInputChange: (value: TaxSimulatorFormLabel | null) => void
  originOptions: { name: string }[]
  territoryOptions: { name: string }[]
  onSubmit: (formData: FormData) => void
  isPending: boolean
}

export default function TaxSimulatorForm({
  form,
  turnstileRef,
  onFocusInputChange,
  originOptions,
  territoryOptions,
  onSubmit,
  isPending,
}: TaxSimulatorFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      <Select
        form={form as any}
        name="product"
        label="Produit"
        placeholder="Rechercher un produit..."
        onSearch={searchProducts}
        onFocus={() => onFocusInputChange("product")}
        noResultsMessage="Aucun produit existant"
      />
      <Select
        form={form as any}
        name="origin"
        label="Territoire d'origine"
        placeholder="FRANCE"
        options={originOptions}
        onFocus={() => onFocusInputChange("origin")}
      />
      <Select
        form={form as any}
        name="territory"
        label="Territoire d'application"
        placeholder="REUNION"
        options={territoryOptions}
        onFocus={() => onFocusInputChange("territory")}
      />
      <CaptchaContainer>
        <Turnstile ref={turnstileRef} />
      </CaptchaContainer>
      <form.AppForm>
        <form.SubscribeButton label={isPending ? "Chargement..." : "Rechercher"} />
      </form.AppForm>
    </form>
  )
}
