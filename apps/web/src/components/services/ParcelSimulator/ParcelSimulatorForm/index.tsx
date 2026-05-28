"use client"

import { mergeForm } from "@tanstack/react-form"
import { initialFormState, useTransform } from "@tanstack/react-form-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "sonner"

import { TurnstileInstance } from "@marsidev/react-turnstile"

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
  const [state, action] = useActionState(calculateParcel, initialFormState)

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  const turnstileRef = useRef<TurnstileInstance>(null)

  useEffect(() => {
    const errorMessage = state.errors?.[0]?.message

    if (errorMessage === "Too many requests") {
      setHasResult(true)
      setResult(state)
    }

    if (errorMessage === "Please validate the captcha") {
      toast.warning("Captcha invalide", {
        description: "Veuillez valider le captcha",
      })
    }

    if (state.taxes) {
      setHasResult(true)
      setResult(state)
      turnstileRef.current?.reset()
    }
  }, [setHasResult, setResult, state])

  const form = useAppForm({
    ...parcelFormOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
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
