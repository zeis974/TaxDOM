import { formOptions } from "@tanstack/react-form-nextjs"
import { z } from "zod"
import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"
import { TaxSimulatorFormSchema } from "@/components/services/ProductTaxesSimulator/types"

// Client-side schemas: form values are already typed (numbers, booleans) — no coercion needed.
// Captcha validated separately (no .min(1) constraint here).
// enterprise uses z.boolean() (not optional) to match the form's inferred type.
const ParcelClientSchema = ParcelSimulatorSchema.extend({
  "cf-turnstile-response": z.string(),
  deliveryPrice: z.number().min(0),
  enterprise: z.boolean(),
  products: z.array(z.object({ name: z.string(), price: z.number().min(0) })),
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
    transporter: "",
  },
  validators: {
    onSubmit: ParcelClientSchema,
  },
})

export const taxFormOpts = formOptions({
  defaultValues: {
    "cf-turnstile-response": "",
    origin: "",
    query: "",
    territory: "REUNION",
  },
  validators: {
    onSubmit: TaxClientSchema,
  },
})
