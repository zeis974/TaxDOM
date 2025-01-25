"use client"

import { AnimatePresence } from "motion/react"
import { Fragment, useRef, useState, type JSX } from "react"
import Link from "next/link"

import { Backdrop, Container } from "./NavLinks.styled"
import { ChevronIcon } from "@/components/Icons"
import ChangeTools from "@/components/Navbar/NavLinks/ChangeTools"

type NavTypes = {
  name: string
  href?: string
  icons?: JSX.Element
  showChangeTools?: boolean
}

export default function NavLinks() {
  const [show, setShow] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const links: NavTypes[] = [
    {
      name: "Services",
      icons: <ChevronIcon />,
      showChangeTools: true,
    },
    {
      name: "Articles",
      href: "/blog",
    },
    {
      name: "Hub",
    },
  ]

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null)) {
      setShow(false)
    }
  }

  return (
    <Container>
      {links.map((link) => (
        <Fragment key={link.name}>
          {link.href ? (
            <Link href={link.href}>{link.name}</Link>
          ) : (
            <>
              {link.showChangeTools ? (
                <>
                  <div
                    ref={navRef}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{ zIndex: 2 }}
                  >
                    <span>
                      {link.name} {link.icons}
                    </span>
                    <AnimatePresence>
                      {link.showChangeTools && show && <ChangeTools {...{ setShow }} />}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {link.showChangeTools && show && (
                      <Backdrop
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <span>
                  {link.name} {link.icons}
                </span>
              )}
            </>
          )}
        </Fragment>
      ))}
    </Container>
  )
}
