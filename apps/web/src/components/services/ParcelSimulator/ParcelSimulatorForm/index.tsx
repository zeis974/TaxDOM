"use client"

import { TurnstileInstance } from "@marsidev/react-turnstile"
import { mergeForm } from "@tanstack/react-form"
import { useTransform } from "@tanstack/react-form-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "sonner"

import calculateParcel from "@/actions/calculateParcel"
import { parcelFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/queries/origins"
import { territoryQueryOptions } from "@/lib/queries/territories"
import { transporterQueryOptions } from "@/lib/queries/transporters"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { ParcelSimulatorCards } from "../ParcelSimulatorCards"
import ParcelSimulatorFormFields from "../ParcelSimulatorFormFields"

import { Container } from "./ParcelSimulator.styled"

export default function ParcelSimulator() {
  const [state, action] = useActionState(calculateParcel, null)

  // The action returns either the API result or, when server validation fails, a form state.
  // Only the latter may be merged: mergeForm copies every key, and a state without values
  // (like initialFormState) would wipe the form values.
  const result = state && "taxes" in state ? state : null
  const formState = state && !("taxes" in state) ? state : null

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  const turnstileRef = useRef<TurnstileInstance>(null)

  useEffect(() => {
    const errorMessage = formState?.errors?.[0]?.message

    if (errorMessage === "Too many requests") {
      setHasResult(true)
    }

    if (errorMessage === "Please validate the captcha") {
      toast.warning("Captcha invalide", {
        description: "Veuillez valider le captcha",
      })
    }

    if (result) {
      setHasResult(true)
      setResult(result)
      turnstileRef.current?.reset()
    }
  }, [formState, result, setHasResult, setResult])

  const form = useAppForm({
    ...parcelFormOpts,
    transform: useTransform(
      (baseForm) => (formState ? mergeForm(baseForm, formState) : baseForm),
      [formState],
    ),
    onSubmit: async ({ value }) => {
      if (value.products.length === 0) {
        toast.info("Veuillez ajouter au moins un produit")
      }
    },
  })

  const { data: originOptions = [] } = useQuery(originQueryOptions)
  const { data: territoryOptions = [] } = useQuery(territoryQueryOptions)
  const { data: transporterOptions = [] } = useQuery(transporterQueryOptions)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget)
    const token = formData.get("cf-turnstile-response")

    if (!token) {
      e.preventDefault()
      toast.warning("Captcha invalide", {
        description: "Veuillez valider le captcha",
      })
      return
    }

    await form.handleSubmit()
  }

  return (
    <Container>
      <form action={action} onSubmit={handleSubmit}>
        <ParcelSimulatorFormFields
          form={form}
          turnstileRef={turnstileRef}
          originOptions={originOptions}
          territoryOptions={territoryOptions}
          transporterOptions={transporterOptions}
        />
        <ParcelSimulatorCards form={form} />
      </form>
    </Container>
  )
}
