"use client"

import type { Origin, Transporter } from "@taxdom/types"

import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"
import { TaxSimulatorFormSchema } from "@/components/services/TaxSimulator/types"

import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form"
import { lazy } from "react"
import { z } from "zod"

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
  customer: "Non",
  deliveryPrice: "" as unknown as number,
  products: [{ name: "", price: "" as unknown as number }],
  transporter: "" as Transporter,
  flux: "import", // For now we only support one flux
  origin: "" as Origin,
  product: "",
  territory: "REUNION", // For now we only support one territory
  "cf-turnstile-response": "",
}

export const formOpts = formOptions({
  defaultValues,
})
