"use server"

import { ServerValidateError, createServerValidate } from "@tanstack/react-form-nextjs"

import { validateTurnstileCaptcha } from "@/actions/validateTurnstileToken"
import { taxFormOpts } from "@/shared/formOpts"

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
  const value = {
    product: formData.get("product"),
    origin: formData.get("origin"),
    territory: formData.get("territory"),
    token: formData.get("cf-turnstile-response"),
  }

  try {
    await serverValidate(formData)
    await validateTurnstileCaptcha(value.token as string)

    const res = await fetch(`${process.env.API_URL}/products/taxes`, {
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
