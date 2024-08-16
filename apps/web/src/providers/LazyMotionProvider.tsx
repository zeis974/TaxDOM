"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import type { PropsWithChildren } from "react"

export default function LazyMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
