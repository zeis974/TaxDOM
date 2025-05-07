"use client"

import { styled } from "@/panda/jsx"
import Link from "next/link"

import { SettingIcon } from "@/components/Icons"

export default function SettingsButton() {
  return (
    <StyledLink href="/settings">
      <SettingIcon />
    </StyledLink>
  )
}

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 45px;
  padding: 5px;
  color: token(colors.primary);
  border-radius: 50%;
  border: 2px solid token(colors.darkGray);
  transition: border 150ms;

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
