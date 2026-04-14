import type { JSX } from "react"
import { easeOut } from "motion/react"
import Link from "next/link"

import { CardContainer, Container } from "./ChangeTools.styled"

import { MagicIcon, ParcelIcon, TaxIcon } from "@/components/Icons"

type Tools = {
  name: string
  description: string
  icon: JSX.Element
  slug: string
  disabled?: boolean
}

const tools: Tools[] = [
  {
    name: "Rechercher les taux",
    description: "Affiche les taux de taxes applicables à un produit",
    icon: <TaxIcon />,
    slug: "/",
  },
  {
    name: "Simuler le cout d'un colis",
    description: "Affiche le taux de taxes applicables à un colis",
    icon: <ParcelIcon />,
    slug: "/simulator",
  },
]

export default function ChangeTools({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Container
      key="changetools"
      initial={{ y: -10, scale: 0.98, opacity: 0 }}
      animate={{ y: 5, scale: 1, opacity: 1 }}
      exit={{ y: -10, scale: 0.98, opacity: 0 }}
      transition={easeOut}
      onMouseLeave={() => setShow(false)}
    >
      {tools.map((tool) => (
        <Link href={tool.slug} key={tool.name} onClick={() => setShow(false)}>
          <CardContainer>
            <div>{tool.icon}</div>
            <div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          </CardContainer>
        </Link>
      ))}
    </Container>
  )
}
