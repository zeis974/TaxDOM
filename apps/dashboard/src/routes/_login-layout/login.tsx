import { createFileRoute, redirect } from "@tanstack/react-router"
import LoginPage from "@/components/Auth/Login"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_login-layout/login")({
  beforeLoad: async () => {
    const sessionData = await authClient.getSession()
    if (sessionData?.data?.user) {
      throw redirect({ to: "/" })
    }
  },
  component: LoginPage,
})
