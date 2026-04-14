import type { PropsWithChildren } from "react"
import { LazyMotion, domAnimation } from "motion/react"

export default function LazyMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
