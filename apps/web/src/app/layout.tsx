import "./globals.css"

import localFont from "next/font/local"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"

import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "TaxDOM - Le calculateur de taxes",
  description: "...",
}

const Rowdies = localFont({
  src: "../../public/assets/fonts/RowdiesRegular.woff2",
  display: "swap",
  variable: "--rowdies",
})

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${Rowdies.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html >
  )
}
