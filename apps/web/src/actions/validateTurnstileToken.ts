"use server"

type CaptchaTurnstileVerifyRes = {
  success: boolean
  "error-codes": string[]
  challenge_ts: string
  hostname: string
}

const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const secret = process.env.NEXT_TURNSTILE_SECRET_KEY as string

export async function validateTurnstileCaptcha(validateToken: string) {
  const response = await fetch(verifyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: secret,
      response: validateToken,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP Error : ${response.status}`)
  }

  const result: CaptchaTurnstileVerifyRes = await response.json()

  return result
}
