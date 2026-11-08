"use client"

import { AnimatePresence } from "motion/react"
import { useEffect, useId, useRef, useState } from "react"
import MegaMenu from "./MegaMenu"
import { Container } from "./NavLinks.styled"

export default function NavLinks() {
  const [show, setShow] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // The click that lands on the trigger right after hovering it must not close the menu again
  const openedByHover = useRef(false)
  const menuId = useId()

  const handleMouseEnter = () => {
    if (!show) openedByHover.current = true
    setShow(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // relatedTarget is the Window, not a Node, when the pointer leaves the page
    const next = e.relatedTarget
    if (!(next instanceof Node) || !toolsRef.current?.contains(next)) {
      setShow(false)
    }
  }

  const handleClick = () => {
    if (openedByHover.current) {
      openedByHover.current = false
      return
    }
    setShow((open) => !open)
  }

  // Tabbing out of the panel closes it instead of leaving it open over the page
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!toolsRef.current?.contains(e.relatedTarget)) setShow(false)
  }

  useEffect(() => {
    if (!show) {
      openedByHover.current = false
      return
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      // The focused tool row unmounts with the panel, so hand focus back to the trigger
      if (toolsRef.current?.contains(document.activeElement)) triggerRef.current?.focus()
      setShow(false)
    }
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
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover and blur only mirror the trigger button, which keeps the keyboard path */}
      <div
        ref={toolsRef}
        data-active={show}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
      >
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={show}
          aria-controls={menuId}
          onClick={handleClick}
        >
          Outils
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            data-chevron
            data-open={show}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {show && <MegaMenu key="mega-menu" id={menuId} close={() => setShow(false)} />}
        </AnimatePresence>
      </div>
      <a href="/blog">Blog</a>
    </Container>
  )
}
