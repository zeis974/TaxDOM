import type { InputProps } from "@/components/Forms/types"

import { formOpts, useFieldContext, withForm } from "@/hooks/form"
import { useStore } from "@tanstack/react-form"

import { Container } from "./Input.styled"
import type { TaxSimulatorFormLabel, TaxSimulatorFormValues } from "@/services/TaxSimulator/types"
import type { ParcelSimulatorFormLabel } from "@/services/ParcelSimulator/types"

export default function InputField({ label, placeholder, type = "text", actions }: InputProps) {
  const field = useFieldContext<string | number>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Container>
      <label htmlFor={field.name}>
        {label}{" "}
        {errors.map((error: string) => (
          <span key={error} style={{ color: "red" }}>
            {error}
          </span>
        ))}
      </label>
      <input
        id={field.name}
        autoComplete="off"
        placeholder={placeholder}
        name={field.name}
        type={type}
        value={field.state.value}
        onFocus={() => actions?.handleOnFocus(field.name)}
        onBlur={() => {
          field.handleBlur()
        }}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
      />
    </Container>
  )
}

export const Input = withForm({
  ...formOpts,
  props: {
    name: "" as TaxSimulatorFormLabel | ParcelSimulatorFormLabel,
    label: "",
    placeholder: "",
    type: "text",
    actions: {
      handleOnFocus: () => {},
    },
  } as InputProps & {
    name: TaxSimulatorFormLabel | ParcelSimulatorFormLabel | ParcelSimulatorFormLabel
  },
  render: ({ form, name, label, placeholder, type, actions }) => (
    <form.AppField
      name={name as TaxSimulatorFormLabel | ParcelSimulatorFormLabel}
      validators={{
        onSubmit: ({ value }) => {
          console.log(value)
          if (!value) {
            return "Champs requis"
          }
        },
      }}
    >
      {(field) => <field.InputField {...{ label, placeholder, actions, type }} />}
    </form.AppField>
  ),
})
