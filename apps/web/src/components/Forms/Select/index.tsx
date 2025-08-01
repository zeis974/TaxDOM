"use client"

import { useState } from "react"

import { searchProducts } from "@/actions/products/searchProducts"
import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import type { TaxSimulatorFormLabel } from "@/components/services/TaxSimulator/types"
import type { SelectProps } from "@/components/Forms/types"

import BaseSelect from "./BaseSelect"

export default function SelectField({
  label,
  actions,
  staticOptions = [],
  watch,
  loading,
  placeholder,
}: SelectProps) {
  const field = useFieldContext<string>()

  return (
    <BaseSelect
      id={field.name}
      name={field.name}
      label={label}
      placeholder={placeholder}
      options={staticOptions}
      value={field.state.value}
      onChange={(value) => {
        field.handleChange(value)
        watch?.(value)
      }}
      onBlur={() => field.handleBlur()}
      onFocus={() => {
        actions?.handleOnFocus?.(field.name as TaxSimulatorFormLabel)
      }}
      loading={loading}
      errors={field.state.meta.errors}
    />
  )
}

export const Select = withForm({
  ...formOpts,
  props: {
    name: "" as SelectProps["name"],
    label: "",
    placeholder: "",
    staticOptions: [],
    actions: { dynamic: false },
  } as SelectProps,
  render: function Render({ form, name, label, staticOptions, placeholder, actions }) {
    if ((staticOptions?.length ?? 0) > 0 && actions?.dynamic) {
      throw new Error(
        "The props 'staticOptions' and 'dynamic' are mutually exclusive. Please choose one or the other.",
      )
    }

    const [options, setOptions] = useState(staticOptions || [])
    const [loading, setLoading] = useState(false)

    return (
      <form.AppField
        name={name}
        validators={{
          onChangeAsyncDebounceMs: 200,
          onChangeAsync: async ({ value }) => {
            if (actions?.dynamic) {
              setLoading(true)
              const data = await searchProducts(value as string)
              setLoading(false)
              setOptions(data)
            }
          },
          onChange: ({ value }) => {
            if (actions?.dynamic) {
              return !value ? "Champs requis" : undefined
            }

            if (staticOptions) {
              for (const option of staticOptions) {
                if (value === option.name) {
                  return option.available ? undefined : "Bientôt disponible"
                }
              }

              if (!value) {
                return "Champs requis"
              }

              return staticOptions.some((option) => option.name === value)
                ? false
                : "Champs invalides"
            }
          },
        }}
      >
        {(field) => (
          <field.SelectField
            name={name}
            label={label}
            actions={actions}
            placeholder={placeholder}
            loading={loading}
            staticOptions={options}
          />
        )}
      </form.AppField>
    )
  },
})
