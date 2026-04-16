"use client"

import { mergeForm } from "@tanstack/react-form"
import { initialFormState, useTransform } from "@tanstack/react-form-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import calculateParcel from "@/actions/calculateParcel"
import { parcelFormOpts, useAppForm } from "@/hooks/form"
import { originQueryOptions } from "@/lib/origins"
import { territoryQueryOptions } from "@/lib/territories"
import { transporterQueryOptions } from "@/lib/transporters"
import Turnstile from "@/lib/Turnstile"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { Input, Radio, Select } from "@/components/Forms"
import { ParcelSimulatorCards } from "../ParcelSimulatorCards"

import { Container } from "./ParcelSimulator.styled"

export default function ParcelSimulator() {
  const [state, action] = useActionState(calculateParcel, initialFormState)

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  useEffect(() => {
    try {
      const errors = state.errors[0]?.message

      if (errors === "Too many requests") {
        setHasResult(true)
        setResult(state)
      }

      if (errors === "Please validate the captcha") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    } catch (e) {
      if (state.taxes) {
        setHasResult(true)
        setResult(state)
      }
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

  return (
    <Container>
      <form action={action} onSubmit={() => form.handleSubmit()}>
        <div>
          <Select
            {...{ form }}
            name="origin"
            label="Origine"
            placeholder="EU"
            options={originOptions}
          />
          <Select
            {...{ form }}
            name="territory"
            label="Territoire d'application"
            placeholder="REUNION"
            options={territoryOptions.map((t) => ({ name: t.territoryName, value: t.territoryID }))}
          />
          <Radio
            {...{ form }}
            name="customer"
            label="Envoi entre particulier ?"
            options={["Oui", "Non"]}
          />
          <Select
            {...{ form }}
            name="transporter"
            label="Transporteur"
            placeholder="COLISSIMO"
            options={transporterOptions}
          />
          <Input
            {...{ form }}
            name="deliveryPrice"
            label="Prix de livraison € (HT)"
            placeholder="0"
            type="number"
          />
          <Turnstile />
          <form.AppForm>
            <form.SubscribeButton label="Calculer" />
          </form.AppForm>
        </div>
        <ParcelSimulatorCards {...{ form }} />
      </form>
    </Container>
  )
}
