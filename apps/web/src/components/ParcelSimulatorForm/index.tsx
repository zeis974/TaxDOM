"use client"

import { initialFormState } from "@tanstack/react-form/nextjs"
import { mergeForm, useTransform } from "@tanstack/react-form"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import calculateParcel from "@/actions/calculateParcel"
import { formOpts, useAppForm } from "@/hooks/form"
import Turnstile from "@/lib/Turnstile"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { OriginData, TerritoryData, TransporterData } from "@/services/data"

import { Container } from "./ParcelSimulator.styled"
import { Input, Select, Radio } from "@/components/Forms"
import ParcelSimulatorCards from "@/components/ParcelSimulatorForm/ParcelSimulatorCards"

export default function ParcelSimulator() {
  const [state, action] = useActionState(calculateParcel, initialFormState)

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  // @TODO : (workaround) fix multiple form re-render
  useEffect(() => {
    try {
      const errors = state.errors[0]?.message

      if (errors === "Please validate the captcha") {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      } else if (errors === "Please add at least one product") {
        toast.info("Veuillez ajouter au moins un produit")
      } else if (errors === "Too many requests") {
        setHasResult(true)
        setResult(state)
      }
    } catch (e) {
      if (state.taxes) {
        setHasResult(true)
        setResult(state)
      }
    }
  }, [state, setHasResult, setResult])

  const form = useAppForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Container>
      <form action={action} onSubmit={() => form.handleSubmit()}>
        <div>
          <h1>Simuler le coût d'un colis</h1>
          <hr />
          <Select
            {...{ form }}
            name="origin"
            label="Origine"
            placeholder="EU"
            staticOptions={OriginData}
          />
          <Select
            {...{ form }}
            name="territory"
            label="Territoire d'application"
            placeholder="Réunion"
            staticOptions={TerritoryData}
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
            placeholder="Colissimo"
            staticOptions={TransporterData}
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
            <form.SubscribeButton label="Rechercher" />
          </form.AppForm>
        </div>
        <form.AppForm>
          <div>
            <ParcelSimulatorCards {...{ form }} />
          </div>
        </form.AppForm>
      </form>
    </Container>
  )
}
