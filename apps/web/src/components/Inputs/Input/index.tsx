import type { TaxSimulatorInputsProps } from "@/services/TaxSimulator/types"

import { Container } from "./Input.styled"

export default function Input<T>({
  Field,
  name,
  label,
  placeholder,
  actions,
}: TaxSimulatorInputsProps<T>) {
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
              onFocus={() => actions?.handleOnFocus(field.name as T)}
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
