"use client"

import { useFormStatus } from "react-dom"

import { useFormContext } from "@/hooks/form"
import { styled } from "@/panda/jsx"

export default function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  const { pending } = useFormStatus()

  return (
    <form.Subscribe selector={(state) => [state.canSubmit]}>
      {([canSubmit]) => (
        <StyledButton type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
          {pending ? <LoadingIcon /> : label}
        </StyledButton>
      )}
    </form.Subscribe>
  )
}

const StyledButton = styled("button", {
  base: {
    width: "100%",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "15px 0",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "150ms",
    background: "{colors.elevated}",
    borderRadius: "{radii.sm}",
    border: "2px solid transparent",
    "& > svg": {
      color: "{colors.foreground}",
      animation: "rotate 2s linear infinite",
    },
    "&:hover:not([disabled]), &:hover:not([aria-disabled])": {
      border: "2px solid {colors.elevated}",
      background: "none",
    },
    '&[disabled], &[aria-disabled="true"]': {
      cursor: "auto",
    },
  },
})

function LoadingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
