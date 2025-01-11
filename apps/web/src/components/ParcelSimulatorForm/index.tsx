"use client"

import { initialFormState } from "@tanstack/react-form/nextjs"
import { mergeForm, useForm, useTransform } from "@tanstack/react-form"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import calculateParcel from "@/actions/calculateParcel"
import { formParcelSimulatorOpts } from "@/lib/form"
import Turnstile from "@/lib/Turnstile"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { OriginData, TerritoryData, TransporterData } from "@/services/data"

import { Container, ParcelSimulatorSubmit } from "./ParcelSimulator.styled"
import { Input, Radio, Select } from "@/components/Inputs"
import ParcelSimulatorCards from "@/components/ParcelSimulatorForm/ParcelSimulatorCards"
import SubmitButton from "@/components/Buttons/SubmitButton"

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

  const { Field, handleSubmit, Subscribe } = useForm({
    ...formParcelSimulatorOpts,
    // biome-ignore lint/style/noNonNullAssertion:
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  })

  return (
    <Container>
      <form
        action={action}
        onSubmit={() => {
          handleSubmit()
        }}
      >
        <div>
          <h1>Simuler le coût d'un colis</h1>
          <hr />
          <Select
            name="origin"
            {...{ Field }}
            label="Origine"
            placeholder="EU"
            staticOptions={OriginData}
          />
          <Select
            name="territory"
            {...{ Field }}
            label="Territoire d'application"
            placeholder="Réunion"
            staticOptions={TerritoryData}
          />
          <Radio
            name="customer"
            {...{ Field }}
            label="Envoi entre particulier ?"
            options={["Oui", "Non"]}
          />
          <Select
            name="transporter"
            {...{ Field }}
            label="Transporteur"
            placeholder="Colissimo"
            staticOptions={TransporterData}
          />
          <Input
            name="deliveryPrice"
            {...{ Field }}
            label="Prix de livraison € (HT)"
            placeholder="0"
            type="number"
          />
          <Turnstile />
          <ParcelSimulatorSubmit>
            <Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => <SubmitButton label="Calculer" {...{ canSubmit }} />}
            </Subscribe>
          </ParcelSimulatorSubmit>
        </div>
        <div>
          <ParcelSimulatorCards {...{ Field, Subscribe }} />
        </div>
      </form>
    </Container>
  )
}
