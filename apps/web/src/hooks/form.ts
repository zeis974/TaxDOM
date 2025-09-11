"use client"

import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form"
import type { Transporter } from "@taxdom/types"
import { lazy } from "react"
import { z } from "zod"

import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"
import { TaxSimulatorFormSchema } from "@/components/services/TaxSimulator/types"

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

const schema = z.intersection(ParcelSimulatorSchema, TaxSimulatorFormSchema)
type Schema = z.infer<typeof schema>

const defaultValues: Schema = {
  "cf-turnstile-response": "",
  customer: "Non",
  deliveryPrice: "" as unknown as number,
  enterprise: false,
  flux: "import", // For now we only support one flux
  origin: "",
  product: "",
  products: [{ name: "", price: "" as unknown as number }],
  taxPaid: false,
  territory: "REUNION",
  transporter: "" as Transporter,
}

export const formOpts = formOptions({
  defaultValues,
})
