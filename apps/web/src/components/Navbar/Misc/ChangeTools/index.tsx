"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"

import {
  Container,
  Content,
  Illustration,
  ModalContainer,
} from "@/components/Navbar/Misc/ChangeTools/ChangeTools.styled"

import { ChevronIcon, TaxIcon } from "@/components/Icons"

interface Tools {
  name: string
  description: string
  icon: JSX.Element
  slug: "/" | "/simulator" | "/nomenclatures"
}

const tools: Tools[] = [
  {
    name: "Taux",
    description: "Rechercher les taux",
    icon: <TaxIcon />,
    slug: "/",
  },
  {
    name: "Simuler",
    description: "Simuler le cout des taxes",
    icon: <TaxIcon />,
    slug: "/simulator",
  },
  {
    name: "Arbres des nomenclatures",
    description: "Listes des nomenclatures",
    icon: <TaxIcon />,
    slug: "/nomenclatures",
  },
]

export default function ChangeTools() {
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)
  const currentTool = tools.find(({ slug }) => (slug === pathname ? pathname : "/"))

  if (currentTool) {
    return (
      <>
        <Container onClick={() => setShowModal(!showModal)} data-open={showModal}>
          <Illustration>{currentTool.icon}</Illustration>
          <Content>
            <h3>{currentTool.name}</h3>
            <span>{currentTool.description}</span>
          </Content>
          <hr />
          <ChevronIcon />
        </Container>
        {showModal && <ModalTools tools={tools} />}
      </>
    )
  }
}

const ModalTools = ({ tools }: { tools: Tools[] }) => {
  return (
    <ModalContainer>
      {tools?.map((tool) => {
        return tool.name
      })}
    </ModalContainer>
  )
}
