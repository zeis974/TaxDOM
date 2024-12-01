"use client"

import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { styled } from "@/panda/jsx"
import { toast } from "sonner"
import { useForm } from "@tanstack/react-form"
import { useState } from "react"

import { Radio, Select } from "@/components/Inputs"
import ParcelSimulatorCards from "@/components/ParcelSimulator/ParcelSimulatorCards"
import SubmitButton from "@/components/Buttons/SubmitButton"

import { OriginData, TerritoryData } from "@/services/data"

export default function ParcelSimulator() {
  const [showStore, setShowStore] = useState(true)

  const { Field, handleSubmit, Subscribe } = useForm<ParcelSimulatorFormValues>({
    defaultValues: {
      customer: "Non",
      origin: "",
      products: [{ name: "", price: undefined }],
      store: "",
      territory: "REUNION",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
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
      onChange: ({ value }) => {
        const isIndividualCustomer = value.customer === "Non"

        if (isIndividualCustomer) {
          setShowStore(true)
        } else {
          setShowStore(false)
        }

        return null
      },
    },
  })

  return (
    <Container>
      <div>
        <h1>Simuler le cout d&apos;un colis</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.Iure,cabo!. Les informations sont
          fournies par le simulateur à titre indicatif.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
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
          {showStore ? <p>FNAC</p> : null}
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

    & p {
      padding: 20px 0;
    }
  }

  & > div:last-child {
    flex: 2;
  }
`
