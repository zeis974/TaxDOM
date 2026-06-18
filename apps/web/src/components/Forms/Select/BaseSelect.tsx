"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import type { SelectOption } from "@taxdom/types"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import { useDebounce } from "@/hooks/useDebounce"
import {
  LoadingCircle,
  NonVirtualItem,
  OptionContainer,
  VirtualItem,
  VirtualizerContainer,
} from "./Select.styled"

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "children" | "role"
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
  onSearch?: (query: string) => Promise<SelectOption[]>
  searchDebounceMs?: number
  searchMinChars?: number
  loading?: boolean
  errors?: string[]
  disabled?: boolean
  required?: boolean
  noResultsMessage?: string
}

interface OptionsListProps {
  options: SelectOption[]
  listboxId: string
  activeIndex: number
  selectedIndex: number
  onSelect: (option: SelectOption) => void
  onMouseDown?: () => void
}

interface OptionItemProps {
  option: SelectOption
  id: string
  isSelected: boolean
  isActive: boolean
  optionIndex: number
  onMouseDown?: () => void
  onSelect: (option: SelectOption) => void
  style?: React.CSSProperties
  virtual?: boolean
}

const itemHeight = 35
const maxVisibleItems = 6
const defaultSearchMinChars = 2
const defaultSearchDebounceMs = 300

function OptionItem({
  option,
  id,
  isSelected,
  isActive,
  optionIndex,
  onMouseDown,
  onSelect,
  style,
  virtual,
}: OptionItemProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      onSelect(option)
    },
    [onSelect, option],
  )

  const commonProps = {
    id,
    role: "option" as const,
    "aria-selected": isSelected,
    "data-option-index": optionIndex,
    "data-selected": isActive,
    "data-available": option.available,
    onMouseDown,
    onClick: handleClick,
    style,
  }

  if (virtual) {
    return <VirtualItem {...commonProps}>{option.name}</VirtualItem>
  }

  return <NonVirtualItem {...commonProps}>{option.name}</NonVirtualItem>
}

function OptionsList({
  options,
  listboxId,
  activeIndex,
  selectedIndex,
  onSelect,
  onMouseDown,
}: OptionsListProps) {
  const parentRef = useRef<HTMLUListElement>(null)

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

  useEffect(() => {
    if (!parentRef.current || activeIndex < 0 || activeIndex >= options.length) return
    const activeElement = parentRef.current.querySelector(`[data-option-index="${activeIndex}"]`)
    activeElement?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, options.length])

  if (options.length === 0) return null

  const optionId = (index: number) => `${listboxId}-option-${index}`

  return (
    <OptionContainer
      ref={parentRef}
      id={listboxId}
      role="listbox"
      aria-label="Suggestions"
      style={{
        height: `${containerHeight}px`,
        overflow: shouldVirtualize ? "auto" : "hidden",
      }}
    >
      {shouldVirtualize ? (
        <VirtualizerContainer
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const option = options[virtualItem.index]
            return (
              <OptionItem
                key={option.value ?? option.name}
                option={option}
                id={optionId(virtualItem.index)}
                isSelected={virtualItem.index === selectedIndex}
                isActive={virtualItem.index === activeIndex}
                optionIndex={virtualItem.index}
                onMouseDown={onMouseDown}
                onSelect={onSelect}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                virtual
              />
            )
          })}
        </VirtualizerContainer>
      ) : (
        options.map((option, index) => (
          <OptionItem
            key={option.value ?? option.name}
            option={option}
            id={optionId(index)}
            isSelected={index === selectedIndex}
            isActive={index === activeIndex}
            optionIndex={index}
            onMouseDown={onMouseDown}
            onSelect={onSelect}
            style={{
              height: `${itemHeight}px`,
              display: "flex",
              alignItems: "center",
              padding: "0 5px",
            }}
          />
        ))
      )}
    </OptionContainer>
  )
}

export default function BaseSelect({
  id: idProp,
  name,
  label,
  placeholder,
  options = [],
  value,
  onChange,
  onBlur,
  onFocus,
  onSearch,
  searchDebounceMs = defaultSearchDebounceMs,
  searchMinChars = defaultSearchMinChars,
  loading,
  errors = [],
  disabled,
  required,
  noResultsMessage,
  ...inputProps
}: BaseSelectProps) {
  const reactId = useId()
  const inputId = idProp ?? name ?? reactId
  const listboxId = `${inputId}-listbox`

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ignoreBlurRef = useRef(false)

  const isSearchMode = Boolean(onSearch)

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [searchResults, setSearchResults] = useState<SelectOption[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const debouncedInputValue = useDebounce(inputValue, searchDebounceMs)

  useEffect(() => {
    if (isSearchMode) {
      setInputValue(value)
    } else {
      const selected = options.find((option) => (option.value ?? option.name) === value)
      setInputValue(selected?.name ?? "")
    }
  }, [value, options, isSearchMode])

  const performSearch = useCallback(
    async (query: string) => {
      if (!onSearch || query.length < searchMinChars) {
        setSearchResults([])
        return
      }
      setSearchLoading(true)
      try {
        const results = await onSearch(query)
        setSearchResults(results)
      } catch {
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    },
    [onSearch, searchMinChars],
  )

  useEffect(() => {
    if (!isSearchMode || !isOpen) return
    performSearch(debouncedInputValue)
  }, [debouncedInputValue, isOpen, isSearchMode, performSearch])

  const filteredOptions = useMemo(() => {
    if (isSearchMode) {
      if (searchLoading) return []
      return searchResults
    }
    if (!inputValue) return options
    const lower = inputValue.toLowerCase()
    const exactMatch = options.some((opt) => opt.name.toLowerCase() === lower)
    if (exactMatch) return []
    return options.filter((opt) => opt.name.toLowerCase().includes(lower))
  }, [isSearchMode, options, inputValue, searchResults, searchLoading])

  const selectedIndex = filteredOptions.findIndex(
    (option) => (option.value ?? option.name) === value,
  )

  const openListbox = useCallback(() => {
    setIsOpen(true)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [selectedIndex])

  const closeListbox = useCallback(() => {
    setIsOpen(false)
    setActiveIndex(-1)
  }, [])

  const selectOption = useCallback(
    (option: SelectOption) => {
      const newValue = option.value ?? option.name
      onChange(newValue)
      setInputValue(option.name)
      closeListbox()
      inputRef.current?.focus()
    },
    [onChange, closeListbox],
  )

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
    if (isSearchMode) {
      onChange(newValue)
    }
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

  const showNoResults =
    isSearchMode &&
    isOpen &&
    !searchLoading &&
    filteredOptions.length === 0 &&
    inputValue.length >= searchMinChars &&
    !!noResultsMessage

  return (
    <InputContainer ref={containerRef}>
      <label htmlFor={inputId}>
        {label}
        {required ? " *" : null}
        {errors.length > 0 ? <span> {errors.join(", ")}</span> : null}
        {showNoResults ? <span> {noResultsMessage}</span> : null}
      </label>
      <input
        {...inputProps}
        ref={inputRef}
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
      {loading || searchLoading ? <LoadingCircle /> : null}
      <AnimatePresence>
        {filteredOptions.length > 0 && isOpen ? (
          <m.div
            style={{ zIndex: 1, height: "100%" }}
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
        ) : null}
      </AnimatePresence>
    </InputContainer>
  )
}
