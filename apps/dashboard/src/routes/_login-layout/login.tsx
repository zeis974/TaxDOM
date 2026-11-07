import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "@/components/Auth/Login"

export const Route = createFileRoute("/_login-layout/login")({
  // Better Auth redirects a refused sign-in here with `?error=<code>`.
  validateSearch: (search: Record<string, unknown>): { error?: string } => ({
    error: typeof search.error === "string" ? search.error : undefined,
  }),
  component: LoginPage,
})
