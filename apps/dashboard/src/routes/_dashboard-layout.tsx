import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { Content, Section } from "@/components/Dashboard/Dashboard.styled"
import Sidebar from "@/components/Dashboard/Sidebar"
import { getServerSession } from "@/lib/auth-server"

export const Route = createFileRoute("/_dashboard-layout")({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session?.user) {
      throw redirect({ to: "/login" })
    }
    return { session }
  },
  component: DashboardLayoutRoute,
})

function DashboardLayoutRoute() {
  const { session } = Route.useRouteContext()

  return (
    <Section>
      <Sidebar
        user={{
          email: session.user.email,
          image: session.user.image,
          name: session.user.name,
        }}
      />
      <Content>
        <Outlet />
      </Content>
    </Section>
  )
}
