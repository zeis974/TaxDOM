import { useEffect } from "react"

export const useOutsideClick = (ref: React.RefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [ref, callback])
}
