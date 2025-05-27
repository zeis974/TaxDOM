"use client"

import type { TaxSimulatorFormLabel } from "../types"

import { mergeForm, useTransform } from "@tanstack/react-form"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { OriginData, TerritoryData } from "@taxdom/types"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import getProductTaxes from "@/actions/getProductTaxes"
import { formOpts, useAppForm } from "@/hooks/form"
import Turnstile from "@/lib/Turnstile"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Radio, Select } from "@/components/Forms"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

export default function TaxSimulatorForm() {
  const [state, action] = useActionState(getProductTaxes, initialFormState)

  const hasResult = useTaxSimulatorStore((s) => s.hasResult)
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)
  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)
  const setResult = useTaxSimulatorStore((s) => s.setResult)
  const setSelectedCountry = useTaxSimulatorStore((s) => s.setSelectedCountry)

  // TODO: https://github.com/TanStack/form/issues/1018
  useEffect(() => {
    if (state.taxes) {
      setHasResult(true)
      setResult(state)
    }
  }, [setHasResult, setResult, state])

  const form = useAppForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    onSubmit: ({ value }) => {
      if (value["cf-turnstile-response"] === "") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    },
  })

  const handleFocusInput = (name: TaxSimulatorFormLabel) => {
    if (!hasResult) setFocusInput(name)
  }

  return (
    <form action={action} onSubmit={() => form.handleSubmit()}>
      <Select
        {...{ form }}
        name="product"
        label="Produit"
        placeholder="Type de produit"
        actions={{
          handleOnFocus: handleFocusInput,
          dynamic: true,
        }}
      />
      <Select
        {...{ form }}
        name="origin"
        label="Territoire d'origine"
        placeholder="EU"
        staticOptions={[...OriginData]}
        actions={{
          handleOnFocus: handleFocusInput,
        }}
      />
      <Select
        {...{ form }}
        name="territory"
        label="Territoire d'application"
        placeholder="Réunion"
        staticOptions={[...TerritoryData]}
        actions={{
          handleOnFocus: handleFocusInput,
        }}
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
