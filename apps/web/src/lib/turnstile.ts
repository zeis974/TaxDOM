export async function verifyTurnstile(
  formRef: React.RefObject<HTMLFormElement>,
): Promise<boolean | undefined> {
  if (formRef.current) {
    const formData = new FormData(formRef.current)
    const token = formData.get("cf-turnstile-response")

    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
      },
    })

    const data: { success: boolean; "error-codes"?: string[] } = await res.json()
    const captchaIsValid = data.success || data["error-codes"]?.includes("timeout-or-duplicate")

    return captchaIsValid
  }
}
