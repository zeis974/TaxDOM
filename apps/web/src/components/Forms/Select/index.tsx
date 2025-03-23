"use client"

import type { OptionsProps, SelectProps } from "@/components/Forms/types"
import type { ParcelSimulatorFormLabel } from "@/services/ParcelSimulator/types"
import type { TaxSimulatorFormLabel } from "@/services/TaxSimulator/types"

import { useRef, useState } from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"

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
  const selectedIndexRef = useRef<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [show, setShow] = useState(false)

  const field = useFieldContext<string>()

  if (staticOptions && actions?.dynamic) {
    throw new Error(
      "[Select] The props 'staticOptions' and 'dynamic' are mutually exclusive. Please choose one or the other.",
    )
  }

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
          actions?.handleOnFocus?.(field.name)
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
    const lowerCaseValue: string = field.state.value.toLowerCase()
    const exactMatchFound =
      lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
    const lowerCaseOption = option.name.toLowerCase()
    return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
  })

  return filteredOptions.length > 0 ? (
    <OptionContainer aria-label="Liste déroulante">
      {filteredOptions.map((option, index) => (
        <li
          key={option.name}
          data-selected={index === selectedIndex}
          data-available={option.available}
          onClick={() => field.handleChange(option.name)}
          onKeyUp={() => field.handleChange(option.name)}
          onMouseEnter={() => {
            watch?.(option.name)
            setSelectedIndex(index)
          }}
        >
          {option.name}
        </li>
      ))}
    </OptionContainer>
  ) : null
}

export const Select = withForm({
  ...formOpts,
  props: {
    name: "" as TaxSimulatorFormLabel | ParcelSimulatorFormLabel,
    label: "",
    placeholder: "",
    staticOptions: [],
    actions: { dynamic: false },
  } as SelectProps & { name: TaxSimulatorFormLabel | ParcelSimulatorFormLabel },
  render: function Render({ form, name, label, staticOptions, placeholder, actions }) {
    if ((staticOptions?.length ?? 0) > 0 && actions?.dynamic) {
      throw new Error(
        "[Select] The props 'staticOptions' and 'dynamic' are mutually exclusive. Please choose one or the other.",
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
          <field.SelectField {...{ label, placeholder, loading }} staticOptions={options} />
        )}
      </form.AppField>
    )
  },
})
