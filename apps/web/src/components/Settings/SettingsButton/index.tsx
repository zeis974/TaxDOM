import Link from "next/link"

import { SettingIcon } from "@/components/Icons"
import { styled } from "@/panda/jsx"

export default function SettingsButton() {
  return (
    <StyledLink href="/settings" aria-label="Ouvre les paramètres">
      <SettingIcon />
    </StyledLink>
  )
}

export const StyledLink = styled(Link)`
  display: inherit;
  padding: 5px;
  color: token(colors.primary);
  border-radius: 5px;
  border: 2px solid token(colors.darkGray);
  transition: border 150ms;

  &:hover {
    border: 2px solid token(colors.primary);
  }

  & > svg {
    transition: 250ms;
  }

  &:hover > svg {
    transform: rotate(45deg) scale(1.05);
  }
`
