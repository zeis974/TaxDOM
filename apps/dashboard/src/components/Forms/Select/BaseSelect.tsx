import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { OptionsList } from "./OptionsList"
import { HintText, LoadingCircle } from "./Select.styled"
import { useSelectPortalContainer } from "./SelectPortalContext"

export interface BaseOption {
  name: string
  available?: boolean
  value?: string
}

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "children" | "role"
>

export interface BaseSelectProps extends NativeInputProps {
  id?: string
  name?: string
  label: string
  placeholder?: string
  hint?: string
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
  id: idProp,
  name,
  label,
  placeholder,
  hint,
  options = [],
  value,
  onChange,
  onBlur,
  onFocus,
  loading,
  errors = [],
  disabled,
  required,
  ...inputProps
}: BaseSelectProps) {
  const reactId = useId()
  const inputId = idProp ?? name ?? reactId
  const listboxId = `${inputId}-listbox`
  const hintId = `${inputId}-hint`

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ignoreBlurRef = useRef(false)

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)

  const portalContainer = useSelectPortalContainer()
  const portalTarget = portalContainer ?? (typeof document !== "undefined" ? document.body : null)

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })

  const selectedIndex = options.findIndex((option) => (option.value ?? option.name) === value)

  useEffect(() => {
    const selected = options.find((option) => (option.value ?? option.name) === value)
    setInputValue(selected?.name ?? "")
  }, [value, options])

  const filteredOptions = options.filter((option) => {
    if (!inputValue) return true
    return option.name.toLowerCase().includes(inputValue.toLowerCase())
  })

  const openListbox = useCallback(() => {
    setIsOpen(true)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [selectedIndex])

  const closeListbox = useCallback(() => {
    setIsOpen(false)
    setActiveIndex(-1)
  }, [])

  const selectOption = useCallback(
    (option: BaseOption) => {
      onChange(option.value ?? option.name)
      setInputValue(option.name)
      closeListbox()
      inputRef.current?.focus()
    },
    [onChange, closeListbox],
  )

  useLayoutEffect(() => {
    if (!isOpen || !inputRef.current) return

    const rect = inputRef.current.getBoundingClientRect()
    if (portalContainer) {
      const containerRect = portalContainer.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom - containerRect.top,
        left: rect.left - containerRect.left,
        width: rect.width,
      })
    } else {
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [isOpen, portalContainer])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !document.getElementById(listboxId)?.contains(target)
      ) {
        closeListbox()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, listboxId, closeListbox])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (!isOpen) openListbox()
    setActiveIndex(0)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.altKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault()
      if (e.key === "ArrowDown") openListbox()
      else closeListbox()
      return
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!isOpen) {
        openListbox()
        return
      }
      setActiveIndex((prev) => {
        const max = filteredOptions.length - 1
        if (max < 0) return -1
        if (e.key === "ArrowDown") return prev >= max ? 0 : prev + 1
        return prev <= 0 ? max : prev - 1
      })
      return
    }

    if (e.key === "Home" && isOpen) {
      e.preventDefault()
      setActiveIndex(0)
      return
    }

    if (e.key === "End" && isOpen) {
      e.preventDefault()
      setActiveIndex(filteredOptions.length - 1)
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      if (isOpen && activeIndex >= 0 && activeIndex < filteredOptions.length) {
        selectOption(filteredOptions[activeIndex])
      } else if (!isOpen) {
        openListbox()
      }
      return
    }

    if (e.key === "Escape") {
      e.preventDefault()
      closeListbox()
    }
  }

  const handleBlur = () => {
    if (ignoreBlurRef.current) {
      ignoreBlurRef.current = false
      inputRef.current?.focus()
      return
    }
    closeListbox()
    onBlur?.()
  }

  const handleOptionMouseDown = () => {
    ignoreBlurRef.current = true
  }

  const handleFocus = useCallback(() => {
    openListbox()
    onFocus?.()
  }, [openListbox, onFocus])

  const activeOptionId =
    isOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined

  return (
    <InputContainer ref={containerRef}>
      <label htmlFor={inputId}>
        {label}
        {required ? " *" : null}
        {errors.length > 0 && <span>{errors.join(", ")}</span>}
      </label>
      <input
        ref={inputRef}
        {...inputProps}
        id={inputId}
        name={name}
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        aria-required={required}
        aria-invalid={errors.length > 0}
        aria-describedby={hint ? hintId : undefined}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={inputValue}
        disabled={disabled}
        readOnly={disabled}
        required={required}
      />
      {loading ? <LoadingCircle /> : null}
      {hint ? <HintText id={hintId}>{hint}</HintText> : null}
      {portalTarget
        ? createPortal(
            <AnimatePresence>
              {filteredOptions.length > 0 && isOpen && (
                <m.div
                  style={{
                    position: portalContainer ? "absolute" : "fixed",
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
                    options={filteredOptions}
                    listboxId={listboxId}
                    activeIndex={activeIndex}
                    selectedIndex={selectedIndex}
                    onSelect={selectOption}
                    onMouseDown={handleOptionMouseDown}
                  />
                </m.div>
              )}
            </AnimatePresence>,
            portalTarget,
          )
        : null}
    </InputContainer>
  )
}
