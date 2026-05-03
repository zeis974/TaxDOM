import { ButtonStyled } from "./Button.styled"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline"
}

export default function Button({ type = "button", variant = "secondary", ...props }: ButtonProps) {
  return (
    <ButtonStyled type={type} data-variant={variant} {...props}>
      {props.children}
    </ButtonStyled>
  )
}
