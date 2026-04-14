"use client"

import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { lazy } from "react"

export { formOpts, parcelFormOpts, taxFormOpts } from "@/shared/formOpts"

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
