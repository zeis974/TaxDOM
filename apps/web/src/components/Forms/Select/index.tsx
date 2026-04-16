"use client"

import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import type { SelectFieldProps, SelectProps } from "@/components/Forms/types"
import BaseSelect from "./BaseSelect"

function SelectField({ label, options = [], placeholder, loading }: SelectFieldProps) {
  const field = useFieldContext<string>()

  return (
    <BaseSelect
      id={field.name}
      name={field.name}
      label={label}
      placeholder={placeholder}
      options={options}
      value={field.state.value ?? ""}
      onChange={(value) => field.handleChange(value)}
      onBlur={() => field.handleBlur()}
      loading={loading}
      errors={field.state.meta.errors}
    />
  )
}

type SelectFormProps = SelectProps & {
  form: unknown
}

export const Select = withForm({
  ...formOpts,
  props: {
    name: "" as SelectProps["name"],
    label: "",
    placeholder: "",
  } as SelectFormProps,
  render: function Render({ form, name, label, options, onSearch, placeholder }) {
    return (
      <form.AppField
        name={name}
        validators={{
          onChangeAsyncDebounceMs: 200,
          onChange: ({ value }) => {
            if (!value) return "Champs requis"
            if (options && options.length > 0) {
              return options.some((opt) => opt.name === value) ? undefined : "Champs invalides"
            }
            return undefined
          },
        }}
      >
        {(field) => (
          <field.SelectField
            name={name}
            label={label}
            placeholder={placeholder}
            options={options ?? []}
            onSearch={onSearch}
          />
        )}
      </form.AppField>
    )
  },
})

export type { SelectFieldProps }
export default SelectField
