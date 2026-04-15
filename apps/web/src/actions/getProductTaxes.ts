"use server"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form-nextjs"

import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { taxFormOpts } from "@/shared/formOpts"
import { TaxSimulatorFormSchema } from "@/components/services/TaxSimulator/types"

const serverValidate = createServerValidate({
  ...taxFormOpts,
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
  try {
    await serverValidate(formData)

    const raw = {
      product: formData.get("product") as string,
      origin: formData.get("origin") as string,
      territory: formData.get("territory") as string,
      token: formData.get("cf-turnstile-response") as string,
    }

    const parsed = TaxSimulatorFormSchema.parse(raw)
    await validateTurnstileCaptcha(parsed["cf-turnstile-response"])

    const res = await fetch(`${process.env.API_URL}/products/taxes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: parsed.product,
        origin: parsed.origin,
        territory: parsed.territory,
        token: parsed["cf-turnstile-response"],
      }),
    }).then((res) => res.json())

    return res
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    throw e
  }
}
