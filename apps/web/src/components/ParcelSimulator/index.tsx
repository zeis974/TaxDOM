"use client"

import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { toast } from "sonner"
import { Turnstile } from "@marsidev/react-turnstile"
import { useForm } from "@tanstack/react-form"
import { useRef, useState } from "react"

import { OriginData, TerritoryData, TransporterData } from "@/services/data"
import { calculateParcel } from "@/actions/calculateParcel"
import { verifyTurnstile } from "@/lib/turnstile"
import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { Container, ParcelSimulatorSubmit } from "./ParcelSimulator.styled"
import { Input, Radio, Select } from "@/components/Inputs"
import ParcelSimulatorCards from "@/components/ParcelSimulator/ParcelSimulatorCards"
import SubmitButton from "@/components/Buttons/SubmitButton"

export default function ParcelSimulator() {
  const formRef = useRef<HTMLFormElement>(null)
  const [captchaIsValid, setCaptchaIsValid] = useState(false)

  const setHasResult = useParcelSimulatorStore((s) => s.setHasResult)
  const setResult = useParcelSimulatorStore((s) => s.setResult)

  const { Field, handleSubmit, Subscribe } = useForm<ParcelSimulatorFormValues>({
    defaultValues: {
      customer: "Non",
      origin: "",
      products: [{ name: "", price: undefined }],
      deliveryPrice: undefined,
      territory: "REUNION", // For now we only support one territory
      transporter: "",
    },
    onSubmit: async ({ value }) => {
      const captchaValidation = await verifyTurnstile(formRef)

      if (captchaValidation) {
        try {
          setCaptchaIsValid(true)
          const data = await calculateParcel(value)

          setHasResult(true)
          setResult({ products: value.products, ...data })
        } catch (err) {
          setHasResult(false)
          setCaptchaIsValid(false)
          toast.error("Une erreur est survenue", {
            description: "Impossible de contacter le serveur",
          })
        }
      } else {
        toast.warning("Captcha invalide", {
          description: "Veuillez valider le captcha",
        })
      }
    },
    validators: {
      onSubmitAsync: async ({ value }: { value: ParcelSimulatorFormValues }) => {
        const hasOneProduct = value.products.length === 0

        if (hasOneProduct) {
          toast.info("Veuillez ajouter au moins un produit")
          return {
            fields: {
              products: "Veuillez ajouter au moins un produit",
            },
          }
        }
        return null
      },
    },
  })

  return (
    <Container>
      <div>
        <h1>Simuler le coût d&apos;un colis</h1>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          ref={formRef}
        >
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
          <Turnstile id="captcha" siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string} />
          <ParcelSimulatorSubmit>
            <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <SubmitButton label="Calculer" {...{ canSubmit, isSubmitting }} />
              )}
            </Subscribe>
          </ParcelSimulatorSubmit>
        </form>
      </div>
      <ParcelSimulatorCards {...{ captchaIsValid, Field, Subscribe }} />
    </Container>
  )
}
