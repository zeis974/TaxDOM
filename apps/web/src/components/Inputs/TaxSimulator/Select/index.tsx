import type { TaxSimulatorSelectProps } from "@/services/TaxSimulator/types"
import type { TaxSimulatorFormValues } from "@taxdom/types"

import type { FieldApi } from "@tanstack/react-form"
import { AnimatePresence, m } from "framer-motion"
import { useEffect, useState } from "react"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Container } from "../Input/Input.styled"
import { OptionContainer } from "./Select.styled"

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
  const hasResult = useTaxSimulatorStore((s) => s.hasResult)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((selectedIndex - 1 + (options.length ?? 0)) % (options.length ?? 0))
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % (options.length ?? 0))
    }
  }

  // Reset selectedIndex to nearest value in array when options change
  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedIndex((prevIndex) => Math.min(prevIndex, options.length - 1))
    }
  }, [options])

  const handleFormState = () => {
    if (!hasResult) setFocusInput(name)
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
        const filtered = options.filter((option) => {
          return option.includes(field.state.value) && option !== field.state.value
        })

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
                handleFormState()
              }}
              onBlur={() => {
                setShow(false)
                field.handleBlur()
              }}
              onKeyDown={(e) => {
                handleKeyDown(e)

                const selectedValue = options[selectedIndex] ?? ""

                console.log(selectedValue)

                if (e.key === "Enter") {
                  e.preventDefault()
                  if (filtered.length > 0) {
                    const selectedValue = filtered[selectedIndex] ?? filtered[0]
                    field.handleChange(selectedValue)
                  }
                }
              }}
              autoComplete="off"
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <AnimatePresence>
              {options && show && (
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
    options.length !== 0 && (
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
    )
  )
}
