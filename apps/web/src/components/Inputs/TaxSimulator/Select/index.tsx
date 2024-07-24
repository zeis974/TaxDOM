import type { TaxSimulatorSelectProps } from "@/services/TaxSimulator/types"
import type { TaxSimulatorFormValues } from "@taxdom/types"

import type { FieldApi } from "@tanstack/react-form"

import { AnimatePresence, m } from "framer-motion"
import { useState } from "react"

import { Container } from "../Input/Input.styled"
import { OptionContainer } from "./Select.styled"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

export default function Select({
  Field,
  name,
  label,
  options,
  placeholder,
}: TaxSimulatorSelectProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [show, setShow] = useState(false)
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((selectedIndex - 1 + (options?.length ?? 0)) % (options?.length ?? 0))
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % (options?.length ?? 0))
    }
  }

  return (
    <Field
      name={name}
      validators={{
        onChange: ({ value }) =>
          !value ? "Champs requis" : options.includes(value) ? undefined : "Champs invalides",
      }}
    >
      {(field) => {
        const filtered = options?.filter((option) =>
          field.state.value !== undefined
            ? option.toLowerCase().includes(field.state.value.toLowerCase())
            : null,
        )
        return (
          <Container>
            <label htmlFor={field.name}>
              {label}{" "}
              {field.state.meta.errors.length ? (
                <span>{field.state.meta.errors.join(",")}</span>
              ) : null}
            </label>
            <input
              id={field.name}
              placeholder={placeholder}
              name={field.name}
              value={field.state.value}
              onFocus={() => {
                setShow(true)
                setFocusInput(field.name)
              }}
              onBlur={() => {
                setShow(false)
                field.handleBlur()
              }}
              onKeyDown={(e) => {
                handleKeyDown(e)

                if (e.key === "Enter") {
                  if (options && options.length > 0) {
                    const selectedValue = options[selectedIndex] ?? ""
                    field.handleChange(selectedValue)
                  }
                }
              }}
              autoComplete="off"
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
            />
            <AnimatePresence>
              {options !== undefined && show && (
                <m.div
                  style={{ zIndex: 1 }}
                  initial={{ translateY: "-5px", opacity: 0 }}
                  animate={{ translateY: "0", opacity: 1 }}
                  exit={{ translateY: "5px", opacity: 0 }}
                >
                  <Options options={filtered} {...{ field, selectedIndex, setSelectedIndex }} />
                </m.div>
              )}
            </AnimatePresence>
          </Container>
        )
      }}
    </Field>
  )
}

const Options = ({
  options,
  field,
  selectedIndex,
  setSelectedIndex,
}: {
  options: string[]
  field: FieldApi<
    TaxSimulatorFormValues,
    keyof TaxSimulatorFormValues,
    undefined,
    undefined,
    string
  >
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  return (
    <>
      {options.length !== 0 && (
        <OptionContainer role="listitem" aria-label="Liste déroulante">
          {options.map((option, index) => (
            <span
              key={option}
              onClick={() => field.handleChange(option)}
              onKeyUp={() => field.handleChange(option)}
              aria-selected={index === selectedIndex}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {option}
            </span>
          ))}
        </OptionContainer>
      )}
    </>
  )
}
