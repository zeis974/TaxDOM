"use client"

import type { PropsWithChildren } from "react"

import { styled } from "@/panda/jsx"
import { useRouter } from "next/navigation"

export default function Modal({ children }: PropsWithChildren) {
  const router = useRouter()
  return (
    <>
      <Container>{children}</Container>
      <Backdrop onClick={() => router.back()} />
    </>
  )
}

const Container = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  position: absolute;
  color: black;
  background: token(colors.background);
  padding: 10px;
  border-radius: 10px;
  z-index: 3;

  animation: fadeIn 150ms, scale 150ms;
`

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background:#191a1b94;
  z-index: 2;
`
