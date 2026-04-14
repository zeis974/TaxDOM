"use client"

import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import type { SelectProps } from "@/components/Forms/types"
import BaseSelect from "./BaseSelect"

export default function SelectField({
  label,
  options = [],
  dynamic,
  loading,
  placeholder,
}: SelectProps) {
  const field = useFieldContext<string>()
  const currentValue = field.state.value || ""

  const enabled = Boolean(dynamic && currentValue)

  const { data: dynamicOptions = [], isFetching } = useQuery<
    { name: string; value?: string }[],
    Error
  >({
    queryKey: ["select-options", dynamic, currentValue],
    queryFn: async () => {
      const path = dynamic ?? ""
      const url = path.startsWith("http") ? new URL(path) : new URL(path, window.location.origin)
      url.searchParams.set("name", currentValue)
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
      if (!res.ok) throw new Error("Failed to fetch options")
      return (await res.json()) as { name: string; value?: string }[]
    },
    enabled,
    staleTime: 30_000,
  })

  const mergedOptions = useMemo(
    () => (dynamic ? dynamicOptions : (options ?? [])),
    [dynamic, dynamicOptions, options],
  )

  return (
    <BaseSelect
      id={field.name}
      name={field.name}
      label={label}
      placeholder={placeholder}
      options={mergedOptions}
      value={field.state.value ?? ""}
      onChange={(value) => {
        field.handleChange(value)
      }}
      onBlur={() => field.handleBlur()}
      loading={loading || isFetching}
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
    options: [],
    actions: {},
  } as SelectProps,
  render: function Render({ form, name, label, options, dynamic, placeholder }) {
    if ((options?.length ?? 0) > 0 && dynamic) {
      throw new Error(
        "The props 'options' and 'dynamic' are mutually exclusive. Please choose one or the other.",
      )
    }

    return (
      <form.AppField
        name={name}
        validators={{
          onChangeAsyncDebounceMs: 200,
          onChangeAsync: async ({ value }) => {
            if (dynamic) return !value ? "Champs requis" : undefined
          },
          onChange: ({ value }) => {
            if (options) {
              if (!value) {
                return "Champs requis"
              }

              return options.some((option) => option.name === value) ? false : "Champs invalides"
            }
          },
        }}
      >
        {(field) => (
          <field.SelectField
            name={name}
            label={label}
            placeholder={placeholder}
            options={options}
            dynamic={dynamic}
          />
        )}
      </form.AppField>
    )
  },
})
