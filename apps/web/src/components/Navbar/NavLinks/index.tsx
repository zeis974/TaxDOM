"use client"

import { AnimatePresence } from "motion/react"
import { useEffect, useRef, useState } from "react"
import MegaMenu from "./MegaMenu"
import { Container } from "./NavLinks.styled"

export default function NavLinks() {
  const [show, setShow] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // relatedTarget is the Window, not a Node, when the pointer leaves the page
    const next = e.relatedTarget
    if (!(next instanceof Node) || !toolsRef.current?.contains(next)) {
      setShow(false)
    }
  }

  useEffect(() => {
    if (!show) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setShow(false)
    // Touch devices have no mouseleave, so a tap outside closes the menu
    const onPointerDown = (e: PointerEvent) => {
      if (!toolsRef.current?.contains(e.target as Node)) setShow(false)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [show])

  return (
    <Container>
      <div
        ref={toolsRef}
        data-active={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Opens only: a tap fires mouseenter then click, so toggling would close it at once */}
        <button type="button" aria-expanded={show} onClick={() => setShow(true)}>
          Outils
        </button>
        <AnimatePresence>
          {show && <MegaMenu key="mega-menu" close={() => setShow(false)} />}
        </AnimatePresence>
      </div>
      <a href="/blog">Blog</a>
    </Container>
  )
}
