import { formOptions } from "@tanstack/react-form-nextjs"
import type { Transporter } from "@taxdom/types"
import { z } from "zod"

import { TaxSimulatorFormSchema } from "@/components/services/ProductTaxesSimulator/types"
import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"

// Client-side schemas: form values are already typed (numbers, booleans) — no coercion needed.
// Captcha validated separately (no .min(1) constraint here).
// enterprise uses z.boolean() (not optional) to match the form's inferred type.
// transporter uses z.any() — no client-side structural check on the object.
const ParcelClientSchema = ParcelSimulatorSchema.extend({
  "cf-turnstile-response": z.string(),
  deliveryPrice: z.number().min(0),
  enterprise: z.boolean(),
  products: z.array(z.object({ name: z.string(), price: z.number().min(0) })),
  transporter: z.any(),
})

const TaxClientSchema = TaxSimulatorFormSchema.extend({
  "cf-turnstile-response": z.string(),
})

export const parcelFormOpts = formOptions({
  defaultValues: {
    "cf-turnstile-response": "",
    customer: "Non" as "Oui" | "Non",
    deliveryPrice: 0,
    enterprise: false,
    origin: "",
    products: [{ name: "", price: 0 }],
    taxPaid: false,
    territory: "REUNION",
    transporter: "" as unknown as Transporter,
  },
  validators: {
    onSubmit: ParcelClientSchema,
  },
})

export const taxFormOpts = formOptions({
  defaultValues: {
    "cf-turnstile-response": "",
    origin: "",
    product: "",
    territory: "REUNION",
  },
  validators: {
    onSubmit: TaxClientSchema,
  },
})
