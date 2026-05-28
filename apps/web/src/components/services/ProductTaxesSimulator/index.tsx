"use client"

import { useStore } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo, useRef, useState } from "react"

import { TurnstileInstance } from "@marsidev/react-turnstile"
import type { ProductTaxesSimulatorResult } from "@taxdom/types"

import { taxFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/queries/origins"
import { territoryQueryOptions } from "@/lib/queries/territories"

import type { TaxSimulatorFormLabel } from "./types"

import TaxSimulatorForm from "./ProductTaxesSimulatorForm"
import ProductTaxesSimulatorOverlay from "./ProductTaxesSimulatorOverlay"

import { Section } from "./ProductTaxesSimulator.styled"

export default function TaxSimulatorService() {
  const [focusInput, setFocusInput] = useState<TaxSimulatorFormLabel | null>(null)
  const [result, setResult] = useState<ProductTaxesSimulatorResult | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)
  const formDataRef = useRef<FormData | null>(null)

  const form = useAppForm({
    ...taxFormOpts,
    onSubmit: async () => {
      if (formDataRef.current) {
        mutation.mutate(formDataRef.current)
        formDataRef.current = null
      }
    },
  })

  const { data: originOptions = [] } = useQuery(originQueryOptions)
  const { data: territoryOptions = [] } = useQuery(territoryQueryOptions)

  const originValue = useStore(form.store, (state) => state.values.origin)
  const territoryValue = useStore(form.store, (state) => state.values.territory)

  const mutation = useMutation<ProductTaxesSimulatorResult, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/product-taxes", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.error || "Request failed")
      }
      const data = (await res.json()) as ProductTaxesSimulatorResult
      return data
    },
    onSuccess: (data) => {
      setResult(data)
      turnstileRef.current?.reset()
    },
  })

  const hasResult = useMemo(() => !!result, [result])

  function handleReset() {
    form.reset()
    turnstileRef.current?.reset()
    setResult(null)
  }

  return (
    <Section>
      <TaxSimulatorForm
        form={form}
        turnstileRef={turnstileRef}
        onFocusInputChange={setFocusInput}
        originOptions={originOptions}
        territoryOptions={territoryOptions}
        onCaptureFormData={(fd) => {
          formDataRef.current = fd
        }}
        isPending={mutation.isPending}
        hasResult={hasResult}
      />
      <ProductTaxesSimulatorOverlay
        focusInput={focusInput}
        selectedCountry={originValue ?? null}
        selectedTerritory={territoryValue ?? null}
        hasResult={hasResult}
        result={result}
        onReset={handleReset}
      />
    </Section>
  )
}
