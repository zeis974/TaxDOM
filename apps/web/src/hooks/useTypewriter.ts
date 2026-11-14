import { useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

/**
 * Reveals a text one character at a time, like it is being typed.
 *
 * Respects `prefers-reduced-motion`: the full text is returned straight away and no timer runs.
 * Timers are cleared on unmount. Meant for a fixed text: changing `text` does not reset the
 * revealed count.
 *
 * @param text - Text to reveal.
 * @param delayMs - Time to wait after mount before the first character appears.
 * @param stepMs - Time between two characters. Defaults to 55 ms.
 * @returns The part of `text` revealed so far, to render as is.
 *
 * @example
 * function Typed({ text }: { text: string }) {
 *   return useTypewriter(text, 400)
 * }
 */
export function useTypewriter(text: string, delayMs: number, stepMs = 55) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? text.length : 0)

  useEffect(() => {
    if (reduce) return
    let interval: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((n) => {
          if (n + 1 >= text.length) clearInterval(interval)
          return n + 1
        })
      }, stepMs)
    }, delayMs)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, delayMs, stepMs, reduce])

  return text.slice(0, count)
}
