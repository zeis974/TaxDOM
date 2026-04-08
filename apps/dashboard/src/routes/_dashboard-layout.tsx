import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Section, Content } from "@/components/Dashboard/Dashboard.styled"

export const Route = createFileRoute("/_dashboard-layout")({
  beforeLoad: async () => {
    const sessionData = await authClient.getSession()
    if (!sessionData?.data?.user) {
      throw redirect({
        to: "/login",
      })
    }
    return { session: sessionData.data }
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
