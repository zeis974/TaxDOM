"use client"

import type { Origin, TaxSimulatorFormValues, Territory } from "@taxdom/types"

import { styled } from "@/panda/jsx"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { getProductTaxes } from "@/actions/getProductTaxes"

import { LoadingIcon } from "@/components/Icons"
import { Input, Radio, Select } from "@/components/Inputs/TaxSimulator"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"
import {
  TaxSimulatorOriginData,
  TaxSimulatorTerritoryData,
} from "@/services/TaxSimulator/data/TaxSimulatorData"

export default function TaxSimulatorForm() {
  const setResult = useTaxSimulatorStore((s) => s.setResult)
  const setHasResult = useTaxSimulatorStore((s) => s.setHasResult)

  const form = useForm<TaxSimulatorFormValues>({
    defaultValues: {
      product: "",
      origin: "" as Origin,
      territory: "REUNION" as Territory, // For now we only support one territory
      flux: "import" as "import" | "export",
    },
    onSubmit: async ({ value }) => {
      setHasResult(true)

      try {
        const data = await getProductTaxes(value)
        setResult(data)
      } catch (err) {
        toast.error("Une erreur est survenue", {
          description: "Impossible de contacter le serveur",
        })
        setHasResult(false)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Input name="product" Field={form.Field} label="Produit" placeholder="Smartphone" />
      <Select
        name="origin"
        Field={form.Field}
        label="Origine"
        placeholder="France"
        options={TaxSimulatorOriginData}
      />
      <Select
        name="territory"
        Field={form.Field}
        label="Territoire d'application"
        placeholder="Réunion"
        options={TaxSimulatorTerritoryData}
      />
      <Radio name="flux" Field={form.Field} label="Flux" options={["import", "export"]} />
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => {
          return (
            <SubmitButton type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
              {isSubmitting ? <LoadingIcon /> : "Rechercher"}
            </SubmitButton>
          )
        }}
      </form.Subscribe>
    </form>
  )
}

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
  font-weight: bold;
  transition: 150ms;
  background: token(colors.darkGray);
  border-radius: 5px;
  border: 2px solid transparent;

  & > svg {
    color: token(colors.primary);
    animation: rotate 2s linear infinite;
  }

  &:hover:not([disabled]),
  &:hover:not([aria-disabled])  {
    border: 2px solid token(colors.darkGray);
    background: none;
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: auto;
  }
`
