"use client"

import { useFieldContext } from "@/hooks/form"

import type { SelectFieldProps } from "@/components/Forms/types"

import BaseSelect from "./BaseSelect"

export default function SelectField({
  label,
  options = [],
  placeholder,
  loading,
  onFocus,
  onSearch,
  noResultsMessage,
}: SelectFieldProps) {
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
      onFocus={onFocus}
      onSearch={onSearch}
      loading={loading}
      errors={field.state.meta.errors}
      noResultsMessage={noResultsMessage}
    />
  )
}
