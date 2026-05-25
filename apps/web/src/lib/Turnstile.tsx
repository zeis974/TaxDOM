"use client"

import { useState } from "react"
import { Turnstile as TurnstileWidget, type TurnstileInstance } from "@marsidev/react-turnstile"
import { useTheme } from "@wrksz/themes/client"

type TurnstileProps = {
  name?: string
  ref?: React.Ref<TurnstileInstance>
}

export default function Turnstile({ name = "cf-turnstile-response", ref }: TurnstileProps) {
  const { resolvedTheme } = useTheme()
  const [token, setToken] = useState("")

  return (
    <>
      <input type="hidden" name={name} value={token} />
      <TurnstileWidget
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ theme: resolvedTheme === "dark" ? "dark" : "light", size: "flexible" }}
        onSuccess={setToken}
        onError={() => setToken("")}
        onExpire={() => setToken("")}
      />
    </>
  )
}
