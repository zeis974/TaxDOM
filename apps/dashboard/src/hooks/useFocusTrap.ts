import { useEffect, useRef } from "react"

const FOCUSABLE_SELECTORS = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => el.offsetParent !== null,
  )
}

/**
 * Traps focus within a container when active.
 * Automatically focuses the first focusable element on activation
 * and restores focus to the previously focused element on deactivation.
 */
export function useFocusTrap({
  containerRef,
  isActive,
}: {
  containerRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}) {
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    triggerRef.current = document.activeElement as HTMLElement
    const modal = containerRef.current

    // Focus first element when trap activates (with small delay for rendering)
    const timer = setTimeout(() => {
      const focusableElements = getFocusableElements(modal)
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return

      const elements = getFocusableElements(containerRef.current)
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]
      const activeElement = document.activeElement

      // If focus is outside modal, bring it back in
      if (!containerRef.current.contains(activeElement)) {
        e.preventDefault()
        first.focus()
        return
      }

      if (e.shiftKey) {
        if (activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("keydown", handleKeyDown)
      triggerRef.current?.focus()
      triggerRef.current = null
    }
  }, [isActive, containerRef])
}
