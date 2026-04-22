"use client"

import { mergeForm } from "@tanstack/react-form"
import { initialFormState, useTransform } from "@tanstack/react-form-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import getProductTaxes from "@/actions/getProductTaxes"
import { taxFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/origins"
import { territoryQueryOptions } from "@/lib/territories"
import Turnstile from "@/lib/Turnstile"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Select } from "@/components/Forms"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

export default function TaxSimulatorForm() {
  const [state, action] = useActionState(getProductTaxes, initialFormState)

  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)
  const setResult = useTaxSimulatorStore((s) => s.setResult)

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
        options={[]}
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
        options={territoryOptions}
      />
      <CaptchaContainer>
        <Turnstile />
      </CaptchaContainer>
      <form.AppForm>
        <form.SubscribeButton label="Rechercher" />
      </form.AppForm>
    </form>
  )
}
