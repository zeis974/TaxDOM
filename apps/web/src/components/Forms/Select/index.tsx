"use client"

import type { OptionsProps, SelectProps } from "@/components/Forms/types"
import type { TaxSimulatorFormLabel } from "@/components/services/TaxSimulator/types"
import { useVirtualizer } from "@tanstack/react-virtual"

import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { useRef, useState } from "react"

import { searchProducts } from "@/actions/searchProducts"
import { formOpts, useFieldContext, withForm } from "@/hooks/form"

import { Container } from "@/components/Forms/Input/Input.styled"
import { LoadingCircle, OptionContainer } from "./Select.styled"

export default function SelectField({
  label,
  actions,
  staticOptions = [],
  watch,
  loading,
  placeholder,
}: SelectProps) {
  const selectedIndexRef = useRef(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [show, setShow] = useState(false)

  const field = useFieldContext<string>()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (staticOptions.length === 0) return

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex =
          e.key === "ArrowUp"
            ? (prevIndex - 1 + staticOptions.length) % staticOptions.length
            : (prevIndex + 1) % staticOptions.length
        selectedIndexRef.current = newIndex
        return newIndex
      })
    }
  }

  return (
    <Container>
      <label htmlFor={field.name}>
        {label}{" "}
        {field.state.meta.errors.length > 0 && <span>{field.state.meta.errors.join(", ")}</span>}
      </label>
      <input
        id={field.name}
        autoComplete="off"
        name={field.name}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={() => {
          setShow(false)
          field.handleBlur()
        }}
        onFocus={() => {
          setShow(true)
          actions?.handleOnFocus?.(field.name as TaxSimulatorFormLabel)
        }}
        onKeyDown={(e) => {
          handleKeyDown(e)
          const selectedValue = staticOptions[selectedIndexRef.current]

          if (selectedValue) {
            watch?.(selectedValue.name)
          }

          if (e.key === "Enter" && selectedValue) {
            e.preventDefault()
            field.handleChange(selectedValue.name)
          }
        }}
        placeholder={placeholder}
        value={field.state.value}
      />
      {loading && <LoadingCircle />}
      <AnimatePresence>
        {staticOptions.length > 0 && show && (
          <m.div
            style={{ zIndex: 1, height: "100%" }}
            initial={{ translateY: "-5px", opacity: 0 }}
            animate={{ translateY: "0", opacity: 1 }}
            exit={{ translateY: "5px", opacity: 0 }}
          >
            <Options
              type={actions?.dynamic ? "dynamic" : "static"}
              options={staticOptions}
              field={field}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              watch={watch}
            />
          </m.div>
        )}
      </AnimatePresence>
    </Container>
  )
}

const Options = ({
  field,
  options,
  selectedIndex,
  setSelectedIndex,
  type,
  watch,
}: OptionsProps) => {
  if (!Array.isArray(options) || (options.length === 0 && type === "dynamic")) return null

  const filteredOptions = options.filter((option) => {
    const lowerCaseValue = field.state.value.toLowerCase()
    const exactMatchFound =
      lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
    const lowerCaseOption = option.name.toLowerCase()
    return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
  })

  const parentRef = useRef<HTMLUListElement>(null)
  const itemHeight = 35
  const maxVisibleItems = 6
  const shouldVirtualize = filteredOptions.length > maxVisibleItems

  const containerHeight = shouldVirtualize
    ? maxVisibleItems * itemHeight
    : filteredOptions.length * itemHeight

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  })

  return filteredOptions.length > 0 ? (
    <OptionContainer
      ref={parentRef}
      aria-label="Liste déroulante"
      style={{
        height: `${containerHeight}px`,
        overflow: shouldVirtualize ? "auto" : "hidden",
      }}
    >
      {shouldVirtualize ? (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const option = filteredOptions[virtualItem.index]
            return (
              <li
                key={option.name}
                data-selected={virtualItem.index === selectedIndex}
                data-available={option.available}
                onClick={() => field.handleChange(option.name)}
                onKeyUp={() => field.handleChange(option.name)}
                onMouseEnter={() => {
                  watch?.(option.name)
                  setSelectedIndex?.(virtualItem.index)
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {option.name}
              </li>
            )
          })}
        </div>
      ) : (
        filteredOptions.map((option, index) => (
          <li
            key={option.name}
            data-selected={index === selectedIndex}
            data-available={option.available}
            onClick={() => field.handleChange(option.name)}
            onKeyUp={() => field.handleChange(option.name)}
            onMouseEnter={() => {
              watch?.(option.name)
              setSelectedIndex?.(index)
            }}
            style={{
              height: `${itemHeight}px`,
              display: "flex",
              alignItems: "center",
              padding: "0 5px",
            }}
          >
            {option.name}
          </li>
        ))
      )}
    </OptionContainer>
  ) : null
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

    const [options, setOptions] = useState<OptionsProps["options"]>(staticOptions || [])
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
              return data.error === "No product found" ? "Aucun produit trouvé" : undefined
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
            {...{ name, label, actions, placeholder, loading }}
            staticOptions={options}
          />
        )}
      </form.AppField>
    )
  },
})
