import { getSession } from "@/actions/getSession"

import { Container } from "./Contributes.styled"

import SignIn from "@/components/Authentification/SignIn"

export default async function Contributes() {
  const session = await getSession()
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
