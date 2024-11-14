"use client"

import { styled } from "@/panda/jsx"
import { toast } from "sonner"
import { useForm } from "@tanstack/react-form"

import ParcelSimulatorCards from "@/components/ParcelSimulator/ParcelSimulatorCards"
import { Radio, Select } from "@/components/Inputs"
import SubmitButton from "@/components/Buttons/SubmitButton"

import { OriginData, TerritoryData } from "@/services/data"

export default function ParcelSimulator() {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      customer: "Oui",
      origin: "",
      products: [{ name: "", price: 0 }] as Array<{
        name: string
        price: number
      }>,
      territory: "REUNION",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const hasOneProduct = value.products.length === 0

        if (hasOneProduct) {
          toast.error("Veuillez ajouter au moins un produit")
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
