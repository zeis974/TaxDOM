"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react"

import type { SelectOption } from "@taxdom/types"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { LoadingCircle, OptionContainer } from "./Select.styled"

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "children"
>

export interface BaseSelectProps extends NativeInputProps {
  id?: string
  name?: string
  label: string
  placeholder?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  loading?: boolean
  errors?: string[]
  disabled?: boolean
  required?: boolean
}

interface OptionsListProps {
  options: SelectOption[]
  onSelect: (value: string) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}

const OptionsList = ({ options, onSelect, selectedIndex, setSelectedIndex }: OptionsListProps) => {
  const parentRef = useRef<HTMLUListElement>(null)
  const itemHeight = 35
  const maxVisibleItems = 6

  const shouldVirtualize = options.length > maxVisibleItems

  const containerHeight = shouldVirtualize
    ? maxVisibleItems * itemHeight
    : options.length * itemHeight

  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  })

  if (options.length === 0) return null

  return (
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
            const option = options[virtualItem.index]
            return (
              <li
                key={option.name}
                data-selected={virtualItem.index === selectedIndex}
                data-available={option.available}
                onClick={() => onSelect(option.value || option.name)}
                onKeyUp={() => onSelect(option.value || option.name)}
                onMouseEnter={() => {
                  setSelectedIndex(virtualItem.index)
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
        options.map((option, index) => (
          <li
            key={option.name}
            data-selected={index === selectedIndex}
            data-available={option.available}
            onClick={() => onSelect(option.value || option.name)}
            onKeyUp={() => onSelect(option.value || option.name)}
            onMouseEnter={() => {
              setSelectedIndex(index)
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
  )
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  const filteredOptions = useMemo(() => {
    if (!value) return options
    const lower = value.toLowerCase()
    const exactMatch = options.some((opt) => opt.name.toLowerCase() === lower)
    if (exactMatch) return []
    return options.filter((opt) => opt.name.toLowerCase().includes(lower))
  }, [options, value])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredOptions.length === 0) return

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => {
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
      const selectedOption = filteredOptions[selectedIndexRef.current]
      if (selectedOption) {
        onChange(selectedOption.value || selectedOption.name)
        setShow(false)
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
        {...inputProps}
        id={id || name}
        name={name}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          setShow(false)
          onBlur?.()
        }}
        onFocus={() => {
          setShow(true)
          onFocus?.()
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
      />
      {loading && <LoadingCircle />}
      <AnimatePresence>
        {filteredOptions.length > 0 && show && (
          <m.div
            style={{ zIndex: 1, height: "100%" }}
            initial={{ translateY: "-5px", opacity: 0 }}
            animate={{ translateY: "0", opacity: 1 }}
            exit={{ translateY: "5px", opacity: 0 }}
          >
            <OptionsList
              options={filteredOptions}
              onSelect={(selectedValue) => {
                onChange(selectedValue)
                setShow(false)
              }}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </m.div>
        )}
      </AnimatePresence>
    </InputContainer>
  )
}
