import { AnimatePresence } from "motion/react"
import { Fragment, useRef, useState } from "react"

import { Backdrop, Container } from "./NavLinks.styled"
import ChevronIcon from "@/components/Icons/ChevronIcon"
import ChangeTools from "../NavLinks/ChangeTools"

type NavTypes = {
  name: string
  href?: string
  icons?: React.JSX.Element
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
      name: "Blog",
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
            <a href={link.href}>{link.name}</a>
          ) : (
            <>
              {link.showChangeTools ? (
                <>
                  <div
                    ref={navRef}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={handleMouseLeave}
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
