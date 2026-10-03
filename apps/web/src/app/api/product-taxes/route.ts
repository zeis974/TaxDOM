import { TaxSimulatorFormSchema } from "@/components/services/ProductTaxesSimulator/types"
import { apiClient } from "@/lib/api/api-server"

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

function looksLikeUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const raw = {
      query: formData.get("query") as string,
      origin: formData.get("origin") as string,
      territory: formData.get("territory") as string,
      "cf-turnstile-response": formData.get("cf-turnstile-response") as string,
    }

    if (!raw.query || !raw.origin || !raw.territory || !raw["cf-turnstile-response"]) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const parsed = TaxSimulatorFormSchema.parse(raw)
    await validateTurnstileCaptcha(parsed["cf-turnstile-response"])

    const value = parsed.query.trim()
    const isUrl = looksLikeUrl(value)

    const res = await apiClient.api.resolveProductTaxes({
      body: {
        ...(isUrl ? { url: value } : { name: value }),
        origin: parsed.origin,
        territory: parsed.territory,
      },
    })

    return Response.json(res)
  } catch (e) {
    const status = (e as { status?: number })?.status

    if (status === 422) {
      return Response.json(
        { error: "Site non compatible", code: "UNSUPPORTED_MERCHANT" },
        { status: 422 },
      )
    }

    console.error(e)
    return Response.json(
      { error: "Failed to resolve taxes", message: (e as Error).message },
      { status: 500 },
    )
  }
}
