"use server"

import type { ParcelSimulatorFormValues } from "@/components/services/ParcelSimulator/types"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form/nextjs"

import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { formOpts } from "@/hooks/form"

const serverValidate = createServerValidate({
  ...formOpts,
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
    if (key.startsWith("products[")) {
      const index = key.match(/products\[(\d+)\]\.(\w+)/)
      if (index) {
        const field = index[2] as keyof ParcelSimulatorFormValues["products"][number]
        const indexNumber = Number.parseInt(index[1], 10)
        products[indexNumber] =
          products[indexNumber] || ({} as ParcelSimulatorFormValues["products"][number])
        // @ts-ignore
        products[indexNumber][field] = value
      }
    }
  })

  const value = {
    customer: formData.get("customer"),
    deliveryPrice: formData.get("deliveryPrice"),
    origin: formData.get("origin"),
    products,
    territory: formData.get("territory"),
    transporter: formData.get("transporter"),
    token: formData.get("cf-turnstile-response"),
  }

  try {
    await serverValidate(formData)
    await validateTurnstileCaptcha(value.token as string)

    const res = await fetch(`${process.env.API_URL}/simulator/parcel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(value),
    }).then((res) => res.json())

    return res
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    throw e
  }
}
