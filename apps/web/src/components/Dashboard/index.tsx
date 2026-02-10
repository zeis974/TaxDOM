import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { authClient } from "@/lib/auth-client"

import Sidebar from "./Sidebar"
import { Content, Section } from "./Dashboard.styled"

export default async function Dashboard({ children }: { children: React.ReactNode }) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  if (!session) redirect("/contributes")

  return (
    <Section>
      <Sidebar
        user={{ email: session.user.email, image: session.user.image, name: session.user.name }}
      />
      <Content>{children}</Content>
    </Section>
  )
}
