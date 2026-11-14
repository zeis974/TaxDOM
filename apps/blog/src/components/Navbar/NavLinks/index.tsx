import { AnimatePresence } from "motion/react"
import { Fragment, useRef, useState } from "react"

import { ChevronIcon } from "@/components/Icons"
import ChangeTools from "../NavLinks/ChangeTools"
import { Container } from "./NavLinks.styled"

type NavTypes = {
  name: string
  href?: string
  icons?: React.JSX.Element
  showChangeTools?: boolean
}

export default function NavLinks() {
  const [show, setShow] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  // The click that lands on the trigger right after hovering it (or tapping it, on a touch
  // screen) must not close the menu again
  const openedByHover = useRef(false)

  const handleMouseEnter = () => {
    if (!show) openedByHover.current = true
    setShow(true)
  }

  const handleClick = () => {
    if (openedByHover.current) {
      openedByHover.current = false
      return
    }
    setShow((current) => !current)
  }

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

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    openedByHover.current = false
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
                  <div ref={navRef}>
                    <button
                      type="button"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleClick}
                    >
                      {link.name} {link.icons}
                    </button>
                    <AnimatePresence>
                      {link.showChangeTools && show && <ChangeTools {...{ setShow }} />}
                    </AnimatePresence>
                  </div>
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
