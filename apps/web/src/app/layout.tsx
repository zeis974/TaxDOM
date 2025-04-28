import "./globals.css"

import type { Metadata } from "next"

import { ThemeProvider } from "next-themes"
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
  src: "../fonts/RowdiesRegular.woff2",
  variable: "--rowdies",
  display: "swap",
})

const NotoSansRegular = localFont({
  src: "../fonts/NotoSansRegular.woff2",
  variable: "--noto-sans",
  display: "swap",
})

const NotoSansBold = localFont({
  src: "../fonts/NotoSansBold.woff2",
  variable: "--noto-sans-bold",
  display: "swap",
})

export default function RootLayout({
  children,
  modal,
}: Record<"children" | "modal", React.ReactNode>) {
  return (
    <html
      lang="fr"
      className={`${Rowdies.variable} ${NotoSansRegular.variable} ${NotoSansBold.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider defaultTheme="dark">
          <QueryProvider>
            <LazyMotionProvider>
              <Navbar />
              {children}
              {modal}
              <Toaster richColors closeButton />
            </LazyMotionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
