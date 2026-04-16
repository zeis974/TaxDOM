"use client"

import type { TaxSimulatorFormLabel } from "../types"

import { mergeForm } from "@tanstack/react-form"
import { initialFormState, useTransform } from "@tanstack/react-form-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import type { SelectOption } from "@taxdom/types"
import getProductTaxes from "@/actions/getProductTaxes"
import { taxFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/origins"
import { territoryQueryOptions } from "@/lib/territories"
import Turnstile from "@/lib/Turnstile"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Radio, Select } from "@/components/Forms"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

export default function TaxSimulatorForm() {
  const [state, action] = useActionState(getProductTaxes, initialFormState)

  const hasResult = useTaxSimulatorStore((s) => s.hasResult)
  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)
  const setResult = useTaxSimulatorStore((s) => s.setResult)
  const setSelectedCountry = useTaxSimulatorStore((s) => s.setSelectedCountry)

  useEffect(() => {
    if (state.taxes) {
      setHasResult(true)
      setResult(state)
    }
  }, [setHasResult, setResult, state])

  const form = useAppForm({
    ...taxFormOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    onSubmit: ({ value }) => {
      if (value["cf-turnstile-response"] === "") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    },
  })

  const { data: originOptions = [] } = useQuery(originQueryOptions)
  const { data: territoryOptions = [] } = useQuery(territoryQueryOptions)

  return (
    <form action={action} onSubmit={() => form.handleSubmit()}>
      <Select
        {...{ form }}
        name="product"
        label="Produit"
        placeholder="Type de produit"
        options={[] as SelectOption[]}
      />
      <Select
        {...{ form }}
        name="origin"
        label="Territoire d'origine"
        placeholder="EU"
        options={originOptions}
      />
      <Select
        {...{ form }}
        name="territory"
        label="Territoire d'application"
        placeholder="Réunion"
        options={territoryOptions.map((t) => ({ name: t.territoryName, value: t.territoryID }))}
      />
      <CaptchaContainer>
        <Radio {...{ form }} name="flux" label="Flux" options={["import", "export"]} disabled />
        <Turnstile />
      </CaptchaContainer>
      <form.AppForm>
        <form.SubscribeButton label="Rechercher" />
      </form.AppForm>
    </form>
  )
}
