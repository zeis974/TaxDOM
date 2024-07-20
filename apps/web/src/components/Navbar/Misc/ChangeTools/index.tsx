"use client"

import { usePathname } from "next/navigation"
import { type ElementRef, useEffect, useRef, useState } from "react"

import {
  Card,
  Container,
  Content,
  Illustration,
  ModalCard,
  ModalContainer,
} from "@/components/Navbar/Misc/ChangeTools/ChangeTools.styled"

import { ChevronIcon, ParcelIcon, TaxIcon } from "@/components/Icons"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"

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
  const currentTool = tools.find(({ slug }) => (slug === pathname ? pathname : "/"))

  const ref = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowModal(false)
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  if (currentTool) {
    return (
      <Container ref={ref}>
        <Card onClick={() => setShowModal(!showModal)} data-open={showModal}>
          <ToolContent tool={currentTool} />
          <hr />
          <ChevronIcon />
        </Card>
        <AnimatePresence>
          {showModal && (
            <ModalContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {tools
                .filter((tool) => tool.slug !== currentTool.slug)
                .map((tool) => (
                  <Link key={tool.name} href={tool.slug}>
                    <ModalCard>
                      <ToolContent {...{ tool }} />
                    </ModalCard>
                  </Link>
                ))}
            </ModalContainer>
          )}
        </AnimatePresence>
      </Container>
    )
  }
}

const ToolContent = ({ tool }: { tool: Tools }) => {
  return (
    <>
      <Illustration>{tool.icon}</Illustration>
      <Content>
        <h3>{tool.name}</h3>
        <span>{tool.description}</span>
      </Content>
    </>
  )
}
