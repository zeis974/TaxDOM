import { ButtonStyled } from "./Button.styled"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline" | "danger" | "publish"
}

export default function Button({ type = "button", variant = "secondary", ...props }: ButtonProps) {
  return (
    <ButtonStyled type={type} data-variant={variant} {...props}>
      {props.children}
    </ButtonStyled>
  )
}
