import type { OptionsProps, SelectProps } from "./types"
import type { TaxSimulatorFormLabel } from "@/services/TaxSimulator/types"

import { useRef, useState } from "react"
import { AnimatePresence, m } from "framer-motion"

import { searchProducts } from "@/actions/searchProducts"

import { Container } from "../Input/Input.styled"
import { LoadingCircle, OptionContainer } from "../Select/Select.styled"

export default function GenericSelect<T>({
  Field,
  actions,
  label,
  name,
  staticOptions,
  watch,
  placeholder,
}: SelectProps<T>) {
  const selectedIndexRef = useRef<number>(0)
  const [options, setOptions] = useState<OptionsProps<T>["options"]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [show, setShow] = useState(false)

  if (staticOptions && actions?.dynamic) {
    throw new Error(
      "[Select] The props 'staticOptions' and 'dynamic' are mutually exclusive. Please choose one or the other.",
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!options || options.length === 0) return

    if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + options.length) % options.length
        selectedIndexRef.current = newIndex
        return newIndex
      })
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % options.length
        selectedIndexRef.current = newIndex
        return newIndex
      })
    }
  }

  return (
    <Field
      name={name}
      validators={{
        onMount: () => {
          if (staticOptions) setOptions([...staticOptions])

          return null
        },
        onChange: ({ value }: { value: string }) => {
          if (staticOptions) {
            for (const option of staticOptions) {
              if (value === option.name) {
                return option.available ? undefined : "Bientôt disponible"
              }
            }

            return !value
              ? "Champs requis"
              : staticOptions.some((option) => option.name === value)
                ? false
                : "Champs invalides"
          }
        },
        onChangeAsyncDebounceMs: 200,
        onChangeAsync: async ({ value }: { value: string }) => {
          if (actions?.dynamic) {
            setLoading(true)
            const data = await searchProducts(value)
            setLoading(false)

            if (data.error === "No product found") {
              return "Aucun produit trouvé"
            }

            setOptions(data)
            return value === "" ? "Champs requis" : false
          }
        },
      }}
    >
      {(field) => {
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
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={() => {
                setShow(false)
                field.handleBlur()
              }}
              onFocus={() => {
                setShow(true)
                actions?.handleOnFocus?.(field.name as T)
              }}
              onKeyDown={(e) => {
                handleKeyDown(e)
                const selectedValue = options?.[selectedIndexRef.current]

                if (selectedValue) {
                  watch?.(selectedValue.name as T)

                  const country = staticOptions?.find(
                    (option) => option.name === selectedValue.name,
                  )
                  if (country) {
                    watch?.(selectedValue.name as T)
                  }
                }

                if (e.key === "Enter") {
                  e.preventDefault()
                  if (options?.length > 0) {
                    field.handleChange(selectedValue.name)
                  }
                }
              }}
              placeholder={placeholder}
              value={field.state.value}
            />
            {loading ? <LoadingCircle /> : null}
            <AnimatePresence>
              {options && show && (
                <m.div
                  style={{ zIndex: 1, height: "100%" }}
                  initial={{ translateY: "-5px", opacity: 0 }}
                  animate={{ translateY: "0", opacity: 1 }}
                  exit={{ translateY: "5px", opacity: 0 }}
                >
                  <Options
                    type={actions?.dynamic ? "dynamic" : "static"}
                    options={options}
                    {...{ field, loading, selectedIndex, setSelectedIndex, watch }}
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

const Options = <T,>({
  field,
  options,
  selectedIndex,
  setSelectedIndex,
  type,
  watch,
}: OptionsProps<T>) => {
  if (!Array.isArray(options) || (options.length === 0 && type === "dynamic")) return null

  const filteredOptions = options.filter((option) => {
    const lowerCaseValue: string = field.state.value.toLowerCase()
    const exactMatchFound =
      lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
    const lowerCaseOption = option.name.toLowerCase()
    return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
  })

  return (
    <>
      {filteredOptions.length > 0 && (
        <OptionContainer aria-label="Liste déroulante">
          {filteredOptions.map((option, index) => {
            const optionValue = option.name
            return (
              <li
                key={optionValue}
                data-selected={index === selectedIndex}
                data-available={option.available}
                onClick={() => field.handleChange(optionValue)}
                onKeyUp={() => field.handleChange(optionValue)}
                onMouseEnter={() => {
                  watch?.(optionValue as T)
                  setSelectedIndex(index)
                }}
              >
                {optionValue}
              </li>
            )
          })}
        </OptionContainer>
      )}
    </>
  )
}
