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
      <div id="captcha-container" />
      <Script
        src={scriptLink}
        onLoad={onLoad}
        onError={(e) => onError(`load error: ${e.message}`)}
      />
    </>
  )
}
