import { styled } from "@/panda/jsx"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
}

export default function Button({ type = "button", ...props }: ButtonProps) {
  return (
    <ButtonStyled type={type} {...props}>
      {props.children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px;
  background: token(colors.tertiaryBackground);
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
