import "../globals.css"

import { ThemeProvider } from "@wrksz/themes/next"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Toaster } from "sonner"

import LazyMotionProvider from "@/providers/LazyMotionProvider"
import QueryProvider from "@/providers/QueryProvider"

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

const themeCookieOptions =
  process.env.NODE_ENV === "production"
    ? { domain: "taxdom.re", path: "/" as const }
    : { path: "/" as const }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${Rowdies.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" storage="cookie" cookieOptions={themeCookieOptions}>
          <QueryProvider>
            <LazyMotionProvider>
              <Navbar />
              {children}
              <Toaster richColors closeButton />
            </LazyMotionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
