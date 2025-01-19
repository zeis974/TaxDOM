"use server"

import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form/nextjs"
import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { formParcelSimulatorOpts } from "@/lib/form"

const serverValidate = createServerValidate({
  ...formParcelSimulatorOpts,
  onServerValidate: ({ value }) => {
    if (!value.products) {
      return "Please add at least one product"
    }

    if (value["cf-turnstile-response"] === "") {
      return "Please validate the captcha"
    }
  },
})

export default async function calculateParcel(prev: unknown, formData: FormData) {
  const products: ParcelSimulatorFormValues["products"] = []
  formData.forEach((value, key) => {
    const match = key.match(/^products\.(\d+)\.(\w+)$/)
    if (match) {
      const index = Number.parseInt(match[1], 10)
      const field = match[2] as keyof ParcelSimulatorFormValues["products"][number]
      products[index] = products[index] || ({} as ParcelSimulatorFormValues["products"][number])
      // @ts-ignore
      products[index][field] = value
    }
  })

  const value = {
    customer: formData.get("customer") as string,
    deliveryPrice: Number.parseFloat(formData.get("deliveryPrice") as string),
    origin: formData.get("origin") as string,
    products,
    territory: formData.get("territory") as string,
    transporter: formData.get("transporter") as string,
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

  const res = await fetch(`${process.env.API_URL}/simulator/parcel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(value),
  }).then((res) => res.json())

  return res
}
