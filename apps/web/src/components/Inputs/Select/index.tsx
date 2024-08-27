import type { TaxSimulatorSelectProps, TerritoryAndOriginType } from "@/services/TaxSimulator/types"
import type { FieldApi } from "@tanstack/react-form"

import { AnimatePresence, m } from "framer-motion"
import { useEffect, useState } from "react"

import { Container } from "@/components/Inputs/Input/Input.styled"
import { OptionContainer } from "./Select.styled"

export default function Select<T>({
  Field,
  name,
  label,
  options,
  placeholder,
  watch,
  actions,
}: TaxSimulatorSelectProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [show, setShow] = useState(false)

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

  return (
    <Field
      name={name}
      validators={{
        onChange: ({
          value,
          fieldApi,
        }: {
          value: TerritoryAndOriginType
          // biome-ignore lint/suspicious/noExplicitAny: any
          fieldApi: FieldApi<any, string, undefined, undefined, any>
        }) => {
          if (fieldApi.name === "territory" && value !== "REUNION") {
            return options.has(value) ? "Bientôt disponible" : "Champs invalides"
          }

          return !value ? "Champs requis" : options.has(value) ? undefined : "Champs invalides"
        },
      }}
    >
      {(field) => {
        const filtered = [...options].filter((option) => {
          const lowerCaseValue = field.state.value.toLowerCase()
          const lowerCaseOption = option.toLowerCase()

          const exactMatchFound = [...options].some(() => lowerCaseOption === lowerCaseValue)

          return exactMatchFound ? false : lowerCaseOption.includes(lowerCaseValue)
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
              autoComplete="off"
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value as TerritoryAndOriginType)}
              onBlur={() => {
                setShow(false)
                field.handleBlur()
              }}
              onFocus={() => {
                setShow(true)
                actions?.handleOnFocus(field.name as T)
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
              placeholder={placeholder}
              value={field.state.value}
            />
            <AnimatePresence>
              {options && show && (
                <m.div
                  style={{ zIndex: 1, height: "100%" }}
                  initial={{ translateY: "-5px", opacity: 0 }}
                  animate={{ translateY: "0", opacity: 1 }}
                  exit={{ translateY: "5px", opacity: 0 }}
                >
                  <Options
                    options={filtered}
                    {...{ field, selectedIndex, setSelectedIndex, watch }}
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

const Options = <T extends string>({
  options,
  field,
  selectedIndex,
  setSelectedIndex,
  watch,
}: {
  options: T[]
  field: // biome-ignore lint/suspicious/noExplicitAny: any
  FieldApi<any, any, any, any>
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  watch?: (value: string) => void
}) => {
  return (
    options.length !== 0 && (
      <OptionContainer role="listitem" aria-label="Liste déroulante">
        {options.map((option, index) => (
          <span
            key={option}
            aria-selected={index === selectedIndex}
            data-available={field.name === "territory" ? option === "REUNION" : null}
            onClick={() => field.handleChange(option)}
            onKeyUp={() => {
              if (watch) {
                watch(option)
              }
              field.handleChange(option)
            }}
            onMouseEnter={() => {
              if (watch) {
                watch(option)
              }
              setSelectedIndex(index)
            }}
          >
            {option}
          </span>
        ))}
      </OptionContainer>
    )
  )
}
