"use client"

import type { SelectFieldProps } from "@/components/Forms/types"
import { useFieldContext } from "@/hooks/form"

import BaseSelect from "./BaseSelect"

export default function SelectField({
  label,
  options = [],
  placeholder,
  loading,
  onFocus,
  onSearch,
  searchDebounceMs,
  searchMinChars,
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
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      onFocus={onFocus}
      onSearch={onSearch}
      searchDebounceMs={searchDebounceMs}
      searchMinChars={searchMinChars}
      loading={loading}
      errors={field.state.meta.errors}
      noResultsMessage={noResultsMessage}
    />
  )
}
