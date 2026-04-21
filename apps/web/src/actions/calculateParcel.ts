"use server"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form-nextjs"

import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { parcelFormOpts } from "@/shared/formOpts"
import { ParcelSimulatorSchema } from "@/components/services/ParcelSimulator/types"
import { apiClient } from "@/lib/api-server"

const serverValidate = createServerValidate({
  ...parcelFormOpts,
  onServerValidate: ({ value }) => {
    if (!value.products || value.products.length === 0) {
      return "Please add at least one product"
    }

    if (value["cf-turnstile-response"] === "") {
      return "Please validate the captcha"
    }
  },
})

export default async function calculateParcel(_prev: unknown, formData: FormData) {
  const raw = {
    customer: formData.get("customer") as string,
    deliveryPrice: formData.get("deliveryPrice") as string,
    origin: formData.get("origin") as string,
    territory: formData.get("territory") as string,
    transporter: formData.get("transporter") as string,
    "cf-turnstile-response": formData.get("cf-turnstile-response") as string,
    products: [] as { name: string; price: number }[],
    enterprise:
      formData.get("enterprise") === "on"
        ? true
        : formData.get("enterprise") === "true"
          ? true
          : false,
    taxPaid:
      formData.get("taxPaid") === "on" ? true : formData.get("taxPaid") === "true" ? true : false,
  }

  formData.forEach((value, key) => {
    const productsMatch = key.match(/^products\[(\d+)\]\.(\w+)$/)
    if (productsMatch) {
      const index = Number.parseInt(productsMatch[1], 10)
      const field = productsMatch[2] as "name" | "price"
      raw.products[index] = raw.products[index] || { name: "", price: 0 }
      if (field === "price") {
        raw.products[index].price = Number(value)
      } else {
        raw.products[index][field] = value as string
      }
    }
  })

  try {
    await serverValidate(formData)

    const parsed = ParcelSimulatorSchema.parse(raw)
    await validateTurnstileCaptcha(parsed["cf-turnstile-response"])

    const res = await apiClient.api.calculateParcel({
      body: {
        customer: parsed.customer,
        deliveryPrice: parsed.deliveryPrice,
        origin: parsed.origin,
        products: parsed.products,
        territory: parsed.territory,
        transporter: parsed.transporter,
        token: parsed["cf-turnstile-response"],
      },
    })

    return res
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    throw e
  }
}
