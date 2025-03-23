"use client"

import type {
  ParcelSimulatorFormLabel,
  ParcelSimulatorFormValues,
} from "@/services/ParcelSimulator/types"
import { TaxSimulatorFormLabel, TaxSimulatorFormValues } from "@/services/TaxSimulator/types"
import { createFormHook, createFormHookContexts, formOptions, useForm } from "@tanstack/react-form"
import { lazy } from "react"

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

const InputField = lazy(() => import("@/components/Forms/Input"))
const RadioField = lazy(() => import("@/components/Forms/Radio"))
const SelectField = lazy(() => import("@/components/Forms/Select"))
const SubscribeButton = lazy(() => import("@/components/Forms/SubscribeButton"))

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    RadioField,
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
})

export const formOpts = formOptions({
  defaultValues: {
    customer: "Non",
    deliveryPrice: "" as unknown as number,
    products: [{ name: "", price: "" as unknown as number }],
    transporter: "",
    flux: "import", // For now we only support one flux
    origin: "",
    product: "",
    territory: "REUNION", // For now we only support one territory
    "cf-turnstile-response": "",
  },
})

// @TODO : Custom formOpts for fieldComponents

// export const formTaxSimulatorOpts = formOptions({
//   defaultValues: {
//     product: "",
//     territory: "REUNION", // For now we only support one territory
//     origin: "",
//     flux: "import", // For now we only support one flux
//     "cf-turnstile-response": "",
//   },
// })

// export const formParcelSimulatorOpts = formOptions({
//   defaultValues: {
//     customer: "Non",
//     deliveryPrice: "" as unknown as number,
//     origin: "",
//     products: [{ name: "", price: "" as unknown as number }],
//     territory: "REUNION", // For now we only support one territory
//     transporter: "",
//     "cf-turnstile-response": "",
//   },
// })
