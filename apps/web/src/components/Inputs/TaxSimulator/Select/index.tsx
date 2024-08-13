import type {
  TaxSimulatorFormValues,
  TaxSimulatorSelectProps,
  Territory,
  Origin,
} from "@/services/TaxSimulator/types"
import type { FieldApi } from "@tanstack/react-form"

import { AnimatePresence, m } from "framer-motion"
import { useEffect, useState } from "react"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { Container } from "../Input/Input.styled"
import { OptionContainer } from "./Select.styled"

type TerritoryAndOriginType = Territory | Origin

export default function Select({
  Field,
  name,
  label,
  options,
  placeholder,
}: TaxSimulatorSelectProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [show, setShow] = useState(false)

  const setSelectedCountry = useTaxSimulatorStore((s) => s.setSelectedCountry)
  const setFocusInput = useTaxSimulatorStore((s) => s.setFocusInput)

  const hasResult = useTaxSimulatorStore((s) => s.hasResult)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((selectedIndex - 1 + (options.size ?? 0)) % (options.size ?? 0))
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % (options.size ?? 0))
    }
  }

  // Reset selectedIndex to nearest value in array when options change
  useEffect(() => {
    if (options && options.size > 0) {
      setSelectedIndex((prevIndex) => Math.min(prevIndex, options.size - 1))
    }
  }, [options])

  const handleFormState = () => {
    if (!hasResult) setFocusInput(name)
  }

  return (
    <Field
      name={name}
      validators={{
        onChange: ({ value, fieldApi }) => {
          if (fieldApi.name === "territory" && value !== "REUNION") {
            return options.has(value as Territory) ? "Bientôt disponible" : "Champs invalides"
          }

          return !value
            ? "Champs requis"
            : options.has(value as TerritoryAndOriginType)
              ? undefined
              : "Champs invalides"
        },
      }}
    >
      {(field) => {
        const filtered = [...options].filter((option) => {
          return (
            option.toLowerCase().includes(field.state.value.toLowerCase()) &&
            option.toLowerCase() !== field.state.value.toLowerCase()
          )
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
                  <Options
                    options={filtered}
                    {...{ field, selectedIndex, setSelectedIndex, setSelectedCountry }}
                  />
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
  setSelectedCountry,
}: {
  options: TerritoryAndOriginType[]
  field: FieldApi<
    TaxSimulatorFormValues,
    keyof TaxSimulatorFormValues,
    undefined,
    undefined,
    string
  >
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  setSelectedCountry: (value: TerritoryAndOriginType) => void
}) => {
  return (
    options.length !== 0 && (
      <OptionContainer role="listitem" aria-label="Liste déroulante">
        {options.map((option, index) => (
          <span
            key={option}
            onClick={() => field.handleChange(option)}
            onKeyUp={() => {
              setSelectedCountry(option)
              field.handleChange(option)
            }}
            aria-selected={index === selectedIndex}
            onMouseEnter={() => {
              setSelectedCountry(option)
              setSelectedIndex(index)
            }}
            data-available={field.name === "territory" ? option === "REUNION" : null}
          >
            {option}
          </span>
        ))}
      </OptionContainer>
    )
  )
}
