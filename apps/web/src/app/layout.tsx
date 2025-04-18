import "./globals.css"

import type { Metadata } from "next"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import localFont from "next/font/local"

import LazyMotionProvider from "@/providers/LazyMotionProvider"

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
        <ThemeProvider defaultTheme="system">
          <LazyMotionProvider>
            <Navbar />
            {children}
            {modal}
            <Toaster richColors closeButton />
          </LazyMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
