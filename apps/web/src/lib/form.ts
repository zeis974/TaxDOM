import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"
import { formOptions } from "@tanstack/react-form/nextjs"

export const formTaxSimulatorOpts = formOptions({
  defaultValues: {
    flux: "import", // For now we only support one flux
    origin: "",
    product: "",
    territory: "REUNION", // For now we only support one territory
    "cf-turnstile-response": "",
  },
})

export const formParcelSimulatorOpts = formOptions<ParcelSimulatorFormValues>({
  defaultValues: {
    customer: "Non",
    deliveryPrice: "" as unknown as number,
    origin: "",
    products: [{ name: "", price: "" as unknown as number }],
    territory: "REUNION", // For now we only support one territory
    transporter: "",
    "cf-turnstile-response": "",
  },
})
