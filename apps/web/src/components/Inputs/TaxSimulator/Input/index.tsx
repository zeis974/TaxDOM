import type { TaxSimulatorInputsProps } from "@/services/TaxSimulator/types"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Container } from "./Input.styled"

export default function Input({ Field, name, label, placeholder }: TaxSimulatorInputsProps) {
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)
  const hasResult = useTaxSimulatorStore((s) => s.hasResult)

  const handleFormState = () => {
    if (!hasResult) setFocusInput(name)
  }

  return (
    <Field
      name={name}
      validators={{
        onChange: ({ value }) => (!value ? "Champs requis" : null),
      }}
    >
      {(field) => {
        return (
          <Container>
            <label htmlFor={field.name}>
              {label}{" "}
              {field.state.meta.errors.length ? (
                <span>{field.state.meta.errors.join(",")}</span>
              ) : null}
            </label>
            <input
              id={field.name}
              placeholder={placeholder}
              name={field.name}
              value={field.state.value}
              onFocus={handleFormState}
              onBlur={() => {
                field.handleBlur()
              }}
              autoComplete="off"
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
            />
          </Container>
        )
      }}
    </Field>
  )
}
