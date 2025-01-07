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
