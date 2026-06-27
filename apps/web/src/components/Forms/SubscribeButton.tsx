"use client"

import { styled } from "@/panda/jsx"
import { useFormContext } from "@/hooks/form"
import { useFormStatus } from "react-dom"

import { LoadingIcon } from "@/components/Icons"

export default function SubscribeButton({
  label,
  disabled = false,
}: {
  label: string
  disabled?: boolean
}) {
  const form = useFormContext()
  const { pending } = useFormStatus()

  return (
    <form.Subscribe selector={(state) => [state.canSubmit]}>
      {([canSubmit]) => (
        <StyledButton
          type="submit"
          disabled={!canSubmit || disabled || pending}
          aria-disabled={!canSubmit || disabled || pending}
        >
          {pending ? <LoadingIcon /> : label}
        </StyledButton>
      )}
    </form.Subscribe>
  )
}

const StyledButton = styled.button`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  cursor: pointer;
  font-weight: bold;
  transition: 150ms;
  background: token(colors.surface);
  border-radius: 5px;
  border: 2px solid transparent;

  & > svg {
    color: token(colors.foreground);
    animation: rotate 2s linear infinite;
  }

  &:hover:not([disabled]),
  &:hover:not([aria-disabled]) {
    border: 2px solid token(colors.surface);
    background: none;
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: auto;
  }
`
