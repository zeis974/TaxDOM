import { domAnimation, LazyMotion } from "motion/react"
import type { PropsWithChildren } from "react"

export default function LazyMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
