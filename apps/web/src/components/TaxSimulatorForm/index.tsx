"use client"

import type { TaxSimulatorFormLabel, TaxSimulatorFormValues } from "@/services/TaxSimulator/types"

import { toast } from "sonner"
import { useForm } from "@tanstack/react-form"
import { useRef } from "react"
import { Turnstile } from "@marsidev/react-turnstile"

import { getProductTaxes } from "@/actions/getProductTaxes"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { OriginData, TerritoryData } from "@/services/data"

import { Radio, Select } from "@/components/Inputs"
import SubmitButton from "@/components/Buttons/SubmitButton"

export default function TaxSimulatorForm() {
  const hasResult = useTaxSimulatorStore((s) => s.hasResult)
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)
  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)
  const setResult = useTaxSimulatorStore((s) => s.setResult)
  const setSelectedCountry = useTaxSimulatorStore((s) => s.setSelectedCountry)

  const formRef = useRef<HTMLFormElement>(null)

  const { Field, handleSubmit, Subscribe } = useForm<TaxSimulatorFormValues>({
    defaultValues: {
      product: "",
      origin: "",
      territory: "REUNION", // For now we only support one territory
      flux: "import", // For now we only support one flux
    },
    onSubmit: async ({ value }) => {
      if (!formRef.current) return

      const formData = new FormData(formRef.current)
      const token = formData.get("cf-turnstile-response")

      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "content-type": "application/json",
        },
      })

      const data = await res.json()

      if (data.success || data["error-codes"]?.includes("timeout-or-duplicate")) {
        try {
          const data = await getProductTaxes(value)

          setHasResult(true)
          setResult({ product: value.product, ...data })
        } catch (err) {
          setHasResult(false)
          toast.error("Une erreur est survenue", {
            description: "Impossible de contacter le serveur",
          })
        }
      } else {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    },
  })

  const handleCountryChange = (country: string) => setSelectedCountry(country)

  const handleFocusInput = (name: TaxSimulatorFormLabel) => {
    if (!hasResult) setFocusInput(name)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
      ref={formRef}
    >
      <Select
        name="product"
        {...{ Field }}
        label="Produit"
        placeholder="Smartphone"
        actions={{
          handleOnFocus: handleFocusInput,
          dynamic: true,
        }}
      />
      <Select
        name="origin"
        {...{ Field }}
        label="Origine"
        placeholder="EU"
        staticOptions={OriginData}
        watch={handleCountryChange}
        actions={{
          handleOnFocus: handleFocusInput,
        }}
      />
      <Select
        name="territory"
        {...{ Field }}
        label="Territoire d'application"
        placeholder="Réunion"
        staticOptions={TerritoryData}
        watch={handleCountryChange}
        actions={{
          handleOnFocus: handleFocusInput,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Radio name="flux" {...{ Field }} label="Flux" options={["import", "export"]} disabled />
        <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string} />
      </div>
      <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => <SubmitButton {...{ canSubmit, isSubmitting }} />}
      </Subscribe>
    </form>
  )
}
