import { useEffect } from "react"

type Options = {
  /** Listeners are only attached while true, typically the open state of the element. */
  enabled: boolean
  /** Media query under which scrolling the page also dismisses, e.g. `"(width < 1080px)"`. */
  scrollQuery?: string
}

/**
 * Dismisses a floating element (menu, popover, panel) on the usual user intents:
 * - pressing Escape,
 * - a pointer down outside `ref` (mouse, touch and pen),
 * - scrolling the page, only while `scrollQuery` matches.
 *
 * @param ref - Element that counts as "inside": pointer downs within it are ignored.
 * @param onDismiss - Called on each dismiss intent. Must be stable (`useCallback`), otherwise
 * listeners are re-attached on every render.
 * @param options - See {@link Options}.
 *
 * @example
 * const panelRef = useRef<HTMLDivElement>(null)
 * const close = useCallback(() => setOpen(false), [])
 *
 * useDismiss(panelRef, close, { enabled: open, scrollQuery: "(width < 1080px)" })
 */
export function useDismiss(
  ref: React.RefObject<HTMLElement | null>,
  onDismiss: () => void,
  { enabled, scrollQuery }: Options,
) {
  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onDismiss()
    }
    const onScroll = () => {
      if (scrollQuery && window.matchMedia(scrollQuery).matches) onDismiss()
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    if (scrollQuery) window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("scroll", onScroll)
    }
  }, [ref, onDismiss, enabled, scrollQuery])
}
