import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_login-layout")({
  beforeLoad: async () => {
    const sessionData = await authClient.getSession()
    if (sessionData?.data?.user) {
      throw redirect({ to: "/" })
    }
  },
  component: LoginLayout,
})

function LoginLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
