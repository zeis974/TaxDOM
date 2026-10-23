"use client"

import { AnimatePresence } from "motion/react"
import { Fragment, type JSX, useRef, useState } from "react"
import { ChevronIcon } from "@/components/Icons"
import ChangeTools from "@/components/Navbar/NavLinks/ChangeTools"
import { Backdrop, Container } from "./NavLinks.styled"

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
      name: "Outils",
      icons: <ChevronIcon />,
      showChangeTools: true,
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ]

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null)) {
      setShow(false)
    }
  }

  return (
    <Container>
      {links.map((link) => (
        <Fragment key={link.name}>
          {link.href ? (
            // /blog is served by the Astro app: a plain anchor forces a full page load
            <a href={link.href}>{link.name}</a>
          ) : (
            <>
              {link.showChangeTools ? (
                <>
                  <div
                    ref={navRef}
                    onPointerEnter={() => setShow(true)}
                    onPointerLeave={handlePointerLeave}
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
