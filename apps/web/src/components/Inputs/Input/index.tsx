import type { TaxSimulatorInputsProps } from "@/services/TaxSimulator/types"

import { Container } from "./Input.styled"

export default function Input<T>({
  Field,
  name,
  label,
  placeholder,
  type = "text",
  actions,
}: TaxSimulatorInputsProps<T>) {
  return (
    <Field
      name={name}
      validators={{
        onSubmit: ({ value }) => (!value ? "Champs requis" : null),
      }}
    >
      {(field) => (
        <Container>
          <label htmlFor={field.name}>
            {label}{" "}
            {field.state.meta.errors.length ? (
              <span>{field.state.meta.errors.join(",")}</span>
            ) : null}
          </label>
          <input
            id={field.name}
            autoComplete="off"
            placeholder={placeholder}
            name={field.name}
            type={type}
            value={field.state.value}
            onFocus={() => actions?.handleOnFocus(field.name as T)}
            onBlur={() => {
              field.handleBlur()
            }}
            onChange={(e) => {
              field.handleChange(e.target.value)
            }}
          />
        </Container>
      )}
    </Field>
  )
}
