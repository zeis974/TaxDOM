import type { RadioProps } from "@/components/Forms/types"

import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import { Container } from "./Radio.styled"

export default function RadioField({ name, label, options, disabled = false }: RadioProps) {
  const field = useFieldContext<string>()

  return (
    <Container>
      <div>
        <span>{label}</span>
        <div>
          {options.map((option: string) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name={field.name}
                value={field.state.value}
                onClick={() => field.setValue(option)}
                defaultChecked={field.state.value === option}
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

export const Radio = withForm({
  ...formOpts,
  props: {
    name: "" as RadioProps["name"],
    label: "",
    options: [],
  } as RadioProps,
  render: ({ form, name, label, options, disabled }) => {
    return (
      <form.AppField name={name}>
        {(field) => <field.RadioField {...{ name, label, options, disabled }} />}
      </form.AppField>
    )
  },
})
