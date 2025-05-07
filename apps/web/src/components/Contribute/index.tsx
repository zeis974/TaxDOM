import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { authClient } from "@/lib/auth-client"

import SignIn from "@/components/Authentification/SignIn"

import { Container } from "./Contributes.styled"

export default async function Contributes() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  if (session) {
    redirect("/")
  }

  return (
    <Container>
      <h2>Participez à l'amélioration du projet</h2>
      <p>
        Aidez-nous à enrichir notre base de données sur les taxes en apportant vos contributions.
      </p>
      <SignIn />
    </Container>
  )
}
