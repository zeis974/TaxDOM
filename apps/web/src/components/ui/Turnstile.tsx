"use client"

import { type TurnstileInstance, Turnstile as TurnstileWidget } from "@marsidev/react-turnstile"
import { useTheme } from "@wrksz/themes/client"

type TurnstileProps = {
  ref?: React.Ref<TurnstileInstance>
}

export default function Turnstile({ ref }: TurnstileProps) {
  const { resolvedTheme } = useTheme()

  return (
    <TurnstileWidget
      ref={ref}
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
      options={{ theme: resolvedTheme === "dark" ? "dark" : "light", size: "flexible" }}
    />
  )
}
