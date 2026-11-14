"use client"

import { AnimatePresence } from "motion/react"
import { useCallback, useId, useRef, useState } from "react"
import { useDeferredImport } from "@/hooks/useDeferredImport"
import { useDismiss } from "@/hooks/useDismiss"
import { Container } from "./NavLinks.styled"

// Kept out of the initial bundle and fetched shortly after mount, so the first hover opens instantly
const loadMegaMenu = () => import("./MegaMenu")

// Matches the width below which the mega menu panel switches to position: fixed
const PANEL_FIXED_QUERY = "(width < 1080px)"

export default function NavLinks() {
  const [show, setShow] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // The click that lands on the trigger right after hovering it (or tapping it, on a hybrid touch
  // screen) must not close the menu again
  const openedByHover = useRef(false)
  const menuId = useId()
  const MegaMenu = useDeferredImport(loadMegaMenu, 500)

  const close = useCallback(() => {
    openedByHover.current = false
    setShow(false)
  }, [])

  // Hands focus back to the trigger when it sits in the panel, which unmounts with it
  const closeAndRestoreFocus = useCallback(() => {
    if (toolsRef.current?.contains(document.activeElement)) triggerRef.current?.focus()
    close()
  }, [close])

  const handleMouseEnter = () => {
    if (!show) openedByHover.current = true
    setShow(true)
  }

  const handleClick = () => {
    if (openedByHover.current) {
      openedByHover.current = false
      return
    }
    setShow((open) => !open)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // relatedTarget is the Window, not a Node, when the pointer leaves the page
    const next = e.relatedTarget
    if (!(next instanceof Node) || !toolsRef.current?.contains(next)) {
      closeAndRestoreFocus()
    }
  }

  // Tabbing out of the panel closes it instead of leaving it open over the page
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!toolsRef.current?.contains(e.relatedTarget)) close()
  }

  // Below the breakpoint the panel is fixed to the viewport and would stay behind while the page scrolls
  useDismiss(toolsRef, closeAndRestoreFocus, { enabled: show, scrollQuery: PANEL_FIXED_QUERY })

  return (
    <Container>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover and blur only mirror the trigger button, which keeps the keyboard path */}
      <div
        ref={toolsRef}
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
          {show && MegaMenu ? <MegaMenu key="mega-menu" id={menuId} close={close} /> : null}
        </AnimatePresence>
      </div>
      <a href="/blog">Blog</a>
    </Container>
  )
}
