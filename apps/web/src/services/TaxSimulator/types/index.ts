import type { OriginDataValue } from "@/services/types"

export interface TaxSimulatorFormValues {
  flux: "import" | "export"
  origin: OriginDataValue
  product: string
  territory: string
  "cf-turnstile-response": string
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues

export type TaxSimulatorInformationLabel = keyof Omit<TaxSimulatorFormValues, "flux">

export type TaxSimulatorResult = {
  product: string
  tva: number
  om: number
  omr: number
  errors: [
    {
      message: string
    },
  ]
}
