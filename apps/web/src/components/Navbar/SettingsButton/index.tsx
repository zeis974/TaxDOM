"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { SettingIcon } from "@/components/Icons"
import Modal from "@/components/Modal"
import { styled } from "@/panda/jsx"

const Settings = dynamic(() => import("@/components/Settings"))

export default function SettingsButton() {
  const [show, setShow] = useState(false)
  return (
    <>
      <ButtonContainer onClick={() => setShow(!show)}>
        <SettingIcon />
      </ButtonContainer>
      <Modal {...{ show, setShow }}>
        <Settings />
      </Modal>
    </>
  )
}

export const ButtonContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    height: "45px",
    padding: "5px",
    color: "{colors.foreground}",
    borderRadius: "50%",
    border: "2px solid {colors.border}",
    transition: "border 150ms",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid {colors.foreground}",
    },
    "& > svg": {
      padding: "3px",
      transition: "250ms",
    },
    "&:hover > svg": {
      transform: "rotate(45deg) scale(1.05)",
    },
  },
})
