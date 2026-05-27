import { apiClient } from "@/lib/api-server"
import { TaxSimulatorFormSchema } from "@/components/services/ProductTaxesSimulator/types"

const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const secret = process.env.NEXT_TURNSTILE_SECRET_KEY as string

async function validateTurnstileCaptcha(token: string) {
  const response = await fetch(verifyEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  })

  if (!response.ok) {
    throw new Error(`Turnstile verification failed: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error("Invalid captcha")
  }

  return result
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const raw = {
      product: formData.get("product") as string,
      origin: formData.get("origin") as string,
      territory: formData.get("territory") as string,
      "cf-turnstile-response": formData.get("cf-turnstile-response") as string,
    }

    if (!raw.product || !raw.origin || !raw.territory || !raw["cf-turnstile-response"]) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const parsed = TaxSimulatorFormSchema.parse(raw)
    await validateTurnstileCaptcha(parsed["cf-turnstile-response"])

    const res = await apiClient.api.getProductTaxes({
      body: {
        product: parsed.product,
        origin: parsed.origin,
        territory: parsed.territory,
      },
    })

    return Response.json(res)
  } catch (e) {
    console.error(e)
    return Response.json(
      { error: "Failed to calculate taxes", message: (e as Error).message },
      { status: 500 },
    )
  }
}
