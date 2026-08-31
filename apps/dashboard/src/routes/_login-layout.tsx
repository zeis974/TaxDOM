import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getServerSession } from "@/lib/auth-server"

export const Route = createFileRoute("/_login-layout")({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (session?.user) {
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
