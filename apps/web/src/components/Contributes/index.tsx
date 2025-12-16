import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { authClient } from "@/lib/auth-client"

import SignIn from "@/components/services/Auth/SignIn"

import Image from "next/image"

import { Container, Content, Illustration } from "./Contributes.styled"

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
      <Content>
        <h2>Contribuez à la plateforme </h2>
        <p>
          Aidez-nous à enrichir notre base de données sur les taxes en apportant vos contributions.
        </p>
        <SignIn />
      </Content>
      <Illustration>
        <Image
          src="https://r2.taxdom.re/images/ContributesIllustrationTaxDOM.webp"
          alt="Illustration TaxDOM Contributes"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Illustration>
    </Container>
  )
}
