import "../globals.css"

import type { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { ThemeProvider } from "next-themes"
import localFont from "next/font/local"
import { Toaster } from "sonner"

import { useDetectDevice } from "@/hooks/useIsMobile"
import LazyMotionProvider from "@/providers/LazyMotionProvider"
import QueryProvider from "@/providers/QueryProvider"

import AlphaMode from "@/components/AlphaMode"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: {
    template: "%s | TaxDOM",
    default: "TaxDOM - Le calculateur de taxes ultra marin",
  },
  description: "...",
}

const Rowdies = localFont({
  src: "../../fonts/RowdiesRegular.woff2",
  variable: "--rowdies",
  display: "swap",
})

export default async function RootLayout({
  children,
  modal,
}: Record<"children" | "modal", React.ReactNode>) {
  const isMobile = await useDetectDevice()

  return (
    <html lang="fr" className={`${Rowdies.variable}`} suppressHydrationWarning>
      <head>
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body>
        <PlausibleProvider domain="taxdom.re" customDomain="https://analytics.taxdom.re">
          {isMobile && <AlphaMode />}
          <ThemeProvider defaultTheme="system">
            <QueryProvider>
              <LazyMotionProvider>
                <Navbar />
                {children}
                {modal}
                <Toaster richColors closeButton />
              </LazyMotionProvider>
            </QueryProvider>
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  )
}
