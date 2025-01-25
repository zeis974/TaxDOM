"use client"

import type { TaxSimulatorFormLabel } from "@/services/TaxSimulator/types"

import { initialFormState } from "@tanstack/react-form/nextjs"
import { mergeForm, useForm, useTransform } from "@tanstack/react-form"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"

import getProductTaxes from "@/actions/getProductTaxes"
import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"
import Turnstile from "@/lib/Turnstile"
import { formTaxSimulatorOpts } from "@/lib/form"

import { OriginData, TerritoryData } from "@/services/data"

import { CaptchaContainer } from "./TaxSimulatorForm.styled"

import { Radio, Select } from "@/components/Inputs"
import SubmitButton from "@/components/Buttons/SubmitButton"

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

  const { Field, handleSubmit, Subscribe } = useForm({
    ...formTaxSimulatorOpts,
    // biome-ignore lint/style/noNonNullAssertion:
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  })

  const handleCountryChange = (country: string) => setSelectedCountry(country)

  const handleFocusInput = (name: TaxSimulatorFormLabel) => {
    if (!hasResult) setFocusInput(name)
  }

  return (
    <form
      action={action}
      onSubmit={() => {
        handleSubmit()
      }}
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
      <CaptchaContainer>
        <Radio name="flux" {...{ Field }} label="Flux" options={["import", "export"]} disabled />
        <Turnstile />
      </CaptchaContainer>
      <Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => <SubmitButton label="Rechercher" {...{ canSubmit }} />}
      </Subscribe>
    </form>
  )
}
