"use client"

import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { styled } from "@/panda/jsx"
import { toast } from "sonner"
import { Turnstile } from "@marsidev/react-turnstile"
import { useForm } from "@tanstack/react-form"
import { useRef } from "react"

import { Input, Radio, Select } from "@/components/Inputs"
import ParcelSimulatorCards from "@/components/ParcelSimulator/ParcelSimulatorCards"
import SubmitButton from "@/components/Buttons/SubmitButton"

import { OriginData, TerritoryData } from "@/services/data"
import { calculateParcel } from "@/actions/calculateParcel"
import { verifyTurnstile } from "@/lib/turnstile"

export default function ParcelSimulator() {
  const formRef = useRef<HTMLFormElement>(null)

  const { Field, handleSubmit, Subscribe } = useForm<ParcelSimulatorFormValues>({
    defaultValues: {
      customer: "Non",
      origin: "",
      products: [{ name: "", price: undefined }],
      deliveryPrice: undefined,
      territory: "REUNION", // For now we only support one territory
    },
    onSubmit: async ({ value }) => {
      const captchaIsValid = await verifyTurnstile(formRef)

      if (captchaIsValid) {
        try {
          const data = await calculateParcel(value)

          console.log(value)
        } catch (err) {
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
      onSubmitAsync: async ({ value }) => {
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
        <h1>Simuler le coût d'un colis</h1>
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
          <Input
            name="deliveryPrice"
            {...{ Field }}
            label="Prix de livraison (HT)"
            placeholder="0"
            type="number"
          />
          <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string} />
          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => <SubmitButton {...{ canSubmit, isSubmitting }} />}
          </Subscribe>
        </form>
      </div>
      <ParcelSimulatorCards {...{ Field }} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  color: token(colors.primary);
  height: 100%;

  & > div:first-child {
    flex: 1;
    height: 100%;
    padding: 20px;
    background: token(colors.secondaryBackground);
    border-radius: 10px;

    & h1 {
      font-family: token(fonts.NotoSansBold);
    }

    & hr {
      margin: 20px 0;
    }
  }

  & > div:last-child {
    flex: 2;
  }
`
