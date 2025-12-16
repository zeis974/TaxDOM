"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"

const scriptLink = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
type TurnstileRenderParameters = Turnstile.RenderParameters

export default function Turnstile(
  props: Pick<
    TurnstileRenderParameters,
    "action" | "cData" | "callback" | "tabindex" | "theme" | "language"
  > & {
    sitekey?: TurnstileRenderParameters["sitekey"]
    size?: "flexible" | "compact"
    errorCallback?: TurnstileRenderParameters["error-callback"]
    expiredCallback?: TurnstileRenderParameters["expired-callback"]
  },
) {
  const { sitekey, errorCallback, expiredCallback, ...rest } = props

  const widgetID = useRef<string | undefined>(null)

  function onError(e?: string | Error) {
    console.log("Captcha error", e)

    if (errorCallback) {
      errorCallback()
    }
  }

  function renderWidget() {
    try {
      widgetID.current = turnstile.render("#captcha-container", {
        ...rest,
        // Refer: https://developers.cloudflare.com/turnstile/reference/testing/
        sitekey: sitekey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        size: "flexible",
        "error-callback": onError,
        "expired-callback": expiredCallback,
      })
      if (!widgetID.current) {
        throw new Error(`turnstile.render return widgetID=${widgetID.current}`)
      }
    } catch (e: unknown) {
      onError(e as Error)
    }
  }

  function onLoad() {
    renderWidget()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once
  useEffect(() => {
    if (!widgetID.current && (window as any).turnstile) {
      renderWidget()
    }
    return () => {
      ;(window as any).turnstile?.remove(widgetID.current || "")
      widgetID.current = undefined
    }
  }, [])

  return (
    <>
      {/** biome-ignore lint/correctness/useUniqueElementIds: false positive */}
      <div id="captcha-container" style={{ width: "100%" }} />
      <Script
        src={scriptLink}
        onLoad={onLoad}
        onError={(e) => onError(`load error: ${e.message}`)}
      />
    </>
  )
}
