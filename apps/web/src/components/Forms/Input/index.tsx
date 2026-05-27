import { useStore } from "@tanstack/react-form"

import type { InputProps } from "@/components/Forms/types"
import { useFieldContext } from "@/hooks/form"

import { InputContainer } from "./Input.styled"

export default function InputField({
  label,
  placeholder,
  type = "text",
  disabled = false,
}: InputProps) {
  const field = useFieldContext<string | number>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <InputContainer>
      <label htmlFor={field.name}>
        {label}{" "}
        {errors.map((error: string) => (
          <span key={error}>{error}</span>
        ))}
      </label>
      <input
        id={field.name}
        autoComplete="off"
        placeholder={placeholder}
        name={field.name}
        type={type}
        value={field.state.value}
        disabled={disabled}
        aria-disabled={disabled}
        onBlur={() => {
          field.handleBlur()
        }}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
      />
    </InputContainer>
  )
}
