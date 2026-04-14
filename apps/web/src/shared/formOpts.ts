import { formOptions } from "@tanstack/react-form"
import type { Transporter } from "@taxdom/types"
import { z } from "zod"

import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"
import { TaxSimulatorFormSchema } from "@/components/services/TaxSimulator/types"

export const parcelFormOpts = formOptions({
  defaultValues: {
    "cf-turnstile-response": "",
    customer: "Non" as "Oui" | "Non",
    deliveryPrice: "" as unknown as number,
    enterprise: false,
    origin: "",
    products: [{ name: "", price: "" as unknown as number }],
    taxPaid: false,
    territory: "REUNION",
    transporter: "" as Transporter,
  },
})

export const taxFormOpts = formOptions({
  defaultValues: {
    "cf-turnstile-response": "",
    flux: "import" as "import" | "export",
    origin: "",
    product: "",
    territory: "REUNION",
  },
})

const schema = z.intersection(ParcelSimulatorSchema, TaxSimulatorFormSchema)
type Schema = z.infer<typeof schema>

const defaultValues: Schema = {
  ...parcelFormOpts.defaultValues,
  ...taxFormOpts.defaultValues,
}

export const formOpts = formOptions({ defaultValues })
