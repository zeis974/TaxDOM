"use client"

import type { TaxSimulatorFormLabel } from "@/services/TaxSimulator/types"

import { initialFormState } from "@tanstack/react-form/nextjs"
import { mergeForm, useTransform } from "@tanstack/react-form"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import getProductTaxes from "@/actions/getProductTaxes"
import { formOpts, useAppForm } from "@/hooks/form"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"
import Turnstile from "@/lib/Turnstile"

import { OriginData, TerritoryData } from "@/services/data"

import { Select, Radio } from "@/components/Forms"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

export default function TaxSimulatorForm() {
  const [state, action] = useActionState(getProductTaxes, initialFormState)

  const hasResult = useTaxSimulatorStore((s) => s.hasResult)
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)
  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)
  const setResult = useTaxSimulatorStore((s) => s.setResult)
  const setSelectedCountry = useTaxSimulatorStore((s) => s.setSelectedCountry)

  // @TODO : (workaround) fix multiple form re-render
  useEffect(() => {
    console.log(state)

    try {
      const errors = state.errors[0]?.message

      if (errors === "Please validate the captcha") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      } else if (errors === "Too many requests") {
        setHasResult(true)
        setResult(state)
      }
    } catch (e) {
      if (state.tva) {
        setHasResult(true)
        setResult(state)
      }
    }
  }, [state, setHasResult, setResult])

  const form = useAppForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
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
        placeholder="Smartphone"
        actions={{
          handleOnFocus: handleFocusInput,
          dynamic: true,
        }}
      />
      <Select
        {...{ form }}
        name="origin"
        label="Origine"
        placeholder="EU"
        staticOptions={OriginData}
        actions={{
          handleOnFocus: handleFocusInput,
        }}
      />
      <Select
        {...{ form }}
        name="territory"
        label="Territoire d'application"
        placeholder="Réunion"
        staticOptions={TerritoryData}
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
