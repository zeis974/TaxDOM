"use server"

import type { TaxSimulatorResult } from "@/components/services/TaxSimulator/types"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form/nextjs"

import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { formOpts } from "@/hooks/form"

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.territory !== "REUNION") {
      return "For now we only support one territory"
    }

    if (value["cf-turnstile-response"] === "") {
      return "Please validate the captcha"
    }
  },
})

export default async function getProductTaxes(prev: unknown, formData: FormData) {
  const value = {
    product: formData.get("product") as string,
    origin: formData.get("origin") as string,
    territory: formData.get("territory") as string,
    token: formData.get("cf-turnstile-response") as string,
  }

  try {
    await serverValidate(formData)
    await validateTurnstileCaptcha(value.token)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return {
        errors: [
          {
            message: e.formState.errors[0],
          },
        ],
      }
    }

    throw e
  }

  const response = await fetch(`${process.env.API_URL}/products/taxes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(value),
  })

  if (!response.ok) {
    const error = await response.json()
    return error
  }

  const data: TaxSimulatorResult = await response.json()

  return {
    ...data,
  }
}
