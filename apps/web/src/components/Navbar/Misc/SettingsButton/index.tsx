"use client"

import { styled } from "@/panda/jsx"
import dynamic from "next/dynamic"
import { useState } from "react"

import { SettingIcon } from "@/components/Icons"
import Modal from "@/components/Modal"

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

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  padding: 5px;
  color: token(colors.primary);
  border-radius: 50%;
  border: 2px solid token(colors.darkGray);
  transition: border 150ms;
  cursor: pointer;

   &:hover {
     border: 2px solid token(colors.primary);
   }

   & > svg {
     padding: 3px;
     transition: 250ms;
   }

   &:hover > svg {
     transform: rotate(45deg) scale(1.05);
   }
`
