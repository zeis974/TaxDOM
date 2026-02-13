import type { CheckboxProps } from "@/components/Forms/types"

import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import { Container } from "./Checkbox.styled"

export default function CheckboxField({ disabled, name, label }: CheckboxProps) {
  const field = useFieldContext<boolean>()

  return (
    <Container>
      <label htmlFor={name}>
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          checked={!!field.state.value}
          onBlur={() => {
            field.handleBlur()
          }}
          onChange={(e) => {
            field.handleChange(e.target.checked)
          }}
          aria-disabled={disabled}
          disabled={disabled}
        />
        <span>{label}</span>
      </label>
    </Container>
  )
}

export const Checkbox = withForm({
  ...formOpts,
  props: {
    disabled: false,
    label: "",
    name: "" as CheckboxProps["name"],
  } as CheckboxProps,
  render: function Render({ form, disabled, label, name }) {
    return (
      <form.AppField
        name={name}
        validators={{
          onSubmit: ({ value }) => {
            if (!value) return "Champs requis"
          },
        }}
      >
        {(field) => <field.CheckboxField {...{ disabled, label, name }} />}
      </form.AppField>
    )
  },
})
