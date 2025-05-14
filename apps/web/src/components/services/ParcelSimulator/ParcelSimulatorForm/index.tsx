"use client"

import { mergeForm, useTransform } from "@tanstack/react-form"
import { initialFormState } from "@tanstack/react-form/nextjs"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import calculateParcel from "@/actions/calculateParcel"
import { formOpts, useAppForm } from "@/hooks/form"
import Turnstile from "@/lib/Turnstile"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { OriginData, TerritoryData, TransporterData } from "@taxdom/types"

import { Input, Radio, Select } from "@/components/Forms"
import { ParcelSimulatorCards } from "../ParcelSimulatorCards"

import { Container } from "./ParcelSimulator.styled"

export default function ParcelSimulator() {
  const [state, action] = useActionState(calculateParcel, initialFormState)

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  // TODO: https://github.com/TanStack/form/issues/1018
  useEffect(() => {
    try {
      const errors = state.errors[0]?.message

      if (errors === "Too many requests") {
        setHasResult(true)
        setResult(state)
      }
    } catch (e) {
      if (state.taxes) {
        setHasResult(true)
        setResult(state)
      }
    }
  }, [setHasResult, setResult, state])

  const form = useAppForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
    onSubmit: async ({ value }) => {
      if (value.products.length === 0) {
        toast.info("Veuillez ajouter au moins un produit")
      }
    },

    onSubmitInvalid: ({ value }) => {
      if (value["cf-turnstile-response"] === "") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    },
  })

  return (
    <Container>
      <form action={action} onSubmit={() => form.handleSubmit()}>
        <div>
          <Select
            {...{ form }}
            name="origin"
            label="Origine"
            placeholder="EU"
            staticOptions={[...OriginData]}
          />
          <Select
            {...{ form }}
            name="territory"
            label="Territoire d'application"
            placeholder="REUNION"
            staticOptions={[...TerritoryData]}
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
            staticOptions={[...TransporterData]}
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
