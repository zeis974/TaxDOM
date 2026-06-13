"use client"

import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { useStore } from "@tanstack/react-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import type {
  ProductTaxesSimulatorResult,
  ResolvedCategoryCandidate,
  ResolveProductTaxesResult,
} from "@taxdom/types"
import { useMemo, useRef, useState } from "react"
import { toast } from "sonner"

import { taxFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/queries/origins"
import { territoryQueryOptions } from "@/lib/queries/territories"
import CategoryCandidates from "./CategoryCandidates"
import { Section } from "./ProductTaxesSimulator.styled"
import TaxSimulatorForm from "./ProductTaxesSimulatorForm"
import ProductTaxesSimulatorOverlay from "./ProductTaxesSimulatorOverlay"
import type { TaxSimulatorFormLabel } from "./types"

export default function TaxSimulatorService() {
  const [focusInput, setFocusInput] = useState<TaxSimulatorFormLabel | null>(null)
  const [result, setResult] = useState<ProductTaxesSimulatorResult | null>(null)
  const [candidates, setCandidates] = useState<ResolvedCategoryCandidate[]>([])
  const [query, setQuery] = useState("")
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

  const mutation = useMutation<ResolveProductTaxesResult, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/product-taxes", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.error || "Request failed")
      }
      return (await res.json()) as ResolveProductTaxesResult
    },
    onSuccess: (data) => {
      turnstileRef.current?.reset()
      setQuery(data.query)

      if (data.taxes) {
        setResult({ product: data.resolvedLabel ?? data.query, taxes: data.taxes })
        setCandidates([])
        return
      }

      if (data.candidates.length > 0) {
        setCandidates(data.candidates)
        setResult(null)
        return
      }

      setCandidates([])
      setResult(null)
      toast.warning("Produit non reconnu", {
        description: "Essayez un autre nom de produit ou un lien marchand.",
      })
    },
  })

  const hasResult = useMemo(() => !!result, [result])
  const hasCandidates = candidates.length > 0 && !hasResult

  function handleReset() {
    form.reset()
    turnstileRef.current?.reset()
    setResult(null)
    setCandidates([])
    setQuery("")
  }

  function handleSelectCandidate(candidate: ResolvedCategoryCandidate) {
    setResult({ product: candidate.categoryName, taxes: candidate.taxes })
    setCandidates([])
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
      {hasCandidates ? (
        <CategoryCandidates
          query={query}
          candidates={candidates}
          onSelect={handleSelectCandidate}
          onReset={handleReset}
        />
      ) : (
        <ProductTaxesSimulatorOverlay
          focusInput={focusInput}
          selectedCountry={originValue ?? null}
          selectedTerritory={territoryValue ?? null}
          hasResult={hasResult}
          result={result}
          onReset={handleReset}
        />
      )}
    </Section>
  )
}
