import { useCallback, useEffect, useRef } from "react"

/**
 * Starts a timeout (replacing any previous one) and guarantees cleanup on unmount.
 *
 * @example
 * const { start, clear } = useResettableTimeout()
 *
 * start(() => setOpen(false), 3000)
 * clear()
 */
export function useResettableTimeout() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const start = useCallback(
    (callback: () => void, delayMs: number) => {
      clear()
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        callback()
      }, delayMs)
    },
    [clear],
  )

  useEffect(() => clear, [clear])

  return { start, clear }
}
