import { ButtonStyled } from "./Button.styled"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary"
}

export default function Button({ type = "button", variant = "secondary", ...props }: ButtonProps) {
  return (
    <ButtonStyled type={type} variant={variant} {...props}>
      {props.children}
    </ButtonStyled>
  )
}
