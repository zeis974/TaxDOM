import { styled } from "@/panda/jsx"
import { LoadingIcon } from "@/components/Icons"

export default function SubmitButton({
  canSubmit,
  isSubmitting,
  label,
}: { canSubmit: boolean; isSubmitting: boolean; label: string }) {
  return (
    <StyledButton type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
      {isSubmitting ? <LoadingIcon /> : label}
    </StyledButton>
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
  background: token(colors.darkGray);
  border-radius: 5px;
  border: 2px solid transparent;

  & > svg {
    color: token(colors.primary);
    animation: rotate 2s linear infinite;
  }

  &:hover:not([disabled]),
  &:hover:not([aria-disabled])  {
    border: 2px solid token(colors.darkGray);
    background: none;
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: auto;
  }
`
