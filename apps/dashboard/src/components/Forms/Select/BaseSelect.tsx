import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  type InputHTMLAttributes,
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { LoadingCircle } from "./Select.styled"
import { OptionsList } from "./OptionsList"

export interface BaseOption {
  name: string
  available?: boolean
  value?: string
}

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "children"
>

export interface BaseSelectProps extends NativeInputProps {
  id?: string
  name?: string
  label: string
  placeholder?: string
  options: BaseOption[]
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  loading?: boolean
  errors?: string[]
  disabled?: boolean
  required?: boolean
}

export default function BaseSelect({
  id,
  name,
  label,
  placeholder,
  options = [],
  value = "",
  onChange,
  onBlur,
  onFocus,
  loading,
  errors = [],
  disabled,
  required,
  ...inputProps
}: BaseSelectProps) {
  const selectedIndexRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [show, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })

  useEffect(() => {
    if (value) {
      const selected = options.find((o) => o.value === value || o.name === value)
      setSearchValue(selected?.name ?? value)
    } else {
      setSearchValue("")
    }
  }, [value, options])

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  useLayoutEffect(() => {
    if (show && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      })
    }
  }, [show])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    setSelectedIndex(0)
    if (!show) setShow(true)
  }

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    setShow(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (options?.length === 0) return

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => {
        const filteredOptions = options.filter((option) => {
          const lowerCaseValue = searchValue.toLowerCase()
          const exactMatchFound =
            lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
          const lowerCaseOption = option.name.toLowerCase()
          return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
        })

        if (filteredOptions.length === 0) return prevIndex

        const newIndex =
          e.key === "ArrowUp"
            ? (prevIndex - 1 + filteredOptions.length) % filteredOptions.length
            : (prevIndex + 1) % filteredOptions.length
        selectedIndexRef.current = newIndex
        return newIndex
      })
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const filteredOptions = options.filter((option) => {
        const lowerCaseValue = searchValue.toLowerCase()
        const exactMatchFound =
          lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
        const lowerCaseOption = option.name.toLowerCase()
        return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
      })

      const selectedOption = filteredOptions[selectedIndexRef.current]
      if (selectedOption) {
        handleSelect(selectedOption.name)
      }
    }

    if (e.key === "Escape") {
      setShow(false)
    }
  }

  return (
    <InputContainer>
      <label htmlFor={id || name}>
        {label}
        {required && " *"}
        {errors.length > 0 && <span> {errors.join(", ")}</span>}
      </label>
      <input
        ref={inputRef}
        {...inputProps}
        id={id || name}
        name={name}
        autoComplete="off"
        onChange={handleInputChange}
        onBlur={() => {
          setTimeout(() => {
            setShow(false)
            onBlur?.()
          }, 120)
        }}
        onFocus={() => {
          setShow(true)
          onFocus?.()
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={searchValue}
        disabled={disabled}
        required={required}
      />
      {loading && <LoadingCircle />}
      {createPortal(
        <AnimatePresence>
          {options.length > 0 && show && (
            <m.div
              style={{
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                zIndex: 9999,
              }}
              initial={{ translateY: "-5px", opacity: 0 }}
              animate={{ translateY: "0", opacity: 1 }}
              exit={{ translateY: "5px", opacity: 0 }}
            >
              <OptionsList
                options={options}
                value={searchValue}
                onSelect={handleSelect}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </m.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </InputContainer>
  )
}
