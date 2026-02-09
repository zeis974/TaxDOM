import "../../globals.css"

import { ThemeProvider } from "next-themes"
import localFont from "next/font/local"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Toaster } from "sonner"

import LazyMotionProvider from "@/providers/LazyMotionProvider"
import QueryProvider from "@/providers/QueryProvider"

import { authClient } from "@/lib/auth-client"

import Dashboard from "@/components/Dashboard"

const Rowdies = localFont({
  src: "../../../fonts/RowdiesRegular.woff2",
  variable: "--rowdies",
  display: "swap",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  if (!session) redirect("/contributes")

  return (
    <html lang="fr" className={`${Rowdies.variable}`} suppressHydrationWarning>
      <head>
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <LazyMotionProvider>
              <Dashboard>{children}</Dashboard>
              <Toaster richColors closeButton />
            </LazyMotionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
