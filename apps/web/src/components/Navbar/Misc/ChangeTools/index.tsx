"use client"

import { type ElementRef, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { useOutsideClick } from "@/hooks/useOutsideClick"
import {
  Container,
  CardContainer,
  Card,
  Content,
  Illustration,
  ModalCard,
  ModalContainer,
} from "@/components/Navbar/Misc/ChangeTools/ChangeTools.styled"
import { ChevronIcon, ParcelIcon, TaxIcon } from "@/components/Icons"

type Tools = {
  name: string
  description: string
  icon: JSX.Element
  slug: string
}

const tools: Tools[] = [
  { name: "Taux", description: "Rechercher les taux", icon: <TaxIcon />, slug: "/" },
  {
    name: "Simuler",
    description: "Simuler le cout d'un colis",
    icon: <ParcelIcon />,
    slug: "/simulator",
  },
  {
    name: "Nomenclatures",
    description: "Listes des nomenclatures",
    icon: <TaxIcon />,
    slug: "/nomenclatures",
  },
]

export default function ChangeTools() {
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)
  const currentTool = tools.find((tool) => tool.slug === pathname)
  const ref = useRef<ElementRef<"div">>(null)

  useOutsideClick(ref, () => setShowModal(false))

  const availableTools = tools.filter((tool) => tool.slug !== currentTool?.slug)

  return (
    <Container ref={ref}>
      {currentTool && (
        <CardContainer>
          <Card onClick={() => setShowModal(!showModal)} data-open={showModal}>
            <ToolContent tool={currentTool} />
            <hr />
            <ChevronIcon />
          </Card>
          <AnimatePresence>
            {showModal && (
              <ModalContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {availableTools.map((tool) => (
                  <Link key={tool.name} href={tool.slug} onClick={() => setShowModal(false)}>
                    <ModalCard>
                      <ToolContent tool={tool} />
                    </ModalCard>
                  </Link>
                ))}
              </ModalContainer>
            )}
          </AnimatePresence>
        </CardContainer>
      )}
    </Container>
  )
}

const ToolContent = ({ tool }: { tool: Tools }) => (
  <>
    <Illustration>{tool.icon}</Illustration>
    <Content>
      <h3>{tool.name}</h3>
      <span>{tool.description}</span>
    </Content>
  </>
)
