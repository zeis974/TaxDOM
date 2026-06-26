import { useStore } from "@tanstack/react-form"

import type { RadioProps } from "@/components/Forms/types"

import { useFieldContext } from "@/hooks/form"

import { Container } from "./Radio.styled"

export default function RadioField({ label, options, disabled = false }: RadioProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Container>
      <div>
        <span>
          {label}{" "}
          {errors.map((error: string) => (
            <span key={error}>{error}</span>
          ))}
        </span>
        <div>
          {options.map((option: string) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name={field.name}
                value={option}
                checked={field.state.value === option}
                onChange={() => {
                  field.setValue(option)
                  field.handleBlur()
                }}
                disabled={disabled}
              />
              <label htmlFor={option}>{option.toString()}</label>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
