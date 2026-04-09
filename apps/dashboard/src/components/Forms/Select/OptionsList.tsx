import { useVirtualizer } from "@tanstack/react-virtual"
import { type Dispatch, type SetStateAction, useMemo, useRef } from "react"
import type { BaseOption } from "./BaseSelect"
import { NonVirtualItem, VirtualItem, VirtualizerContainer } from "./OptionsList.styled"
import { OptionContainer } from "./Select.styled"

interface OptionsListProps {
  options: BaseOption[]
  value: string
  onSelect: (value: string) => void
  selectedIndex: number
  setSelectedIndex: Dispatch<SetStateAction<number>>
}

export function OptionsList({
  options,
  value,
  onSelect,
  selectedIndex,
  setSelectedIndex,
}: OptionsListProps) {
  const parentRef = useRef<HTMLUListElement>(null)
  const itemHeight = 35
  const maxVisibleItems = 6

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const lowerCaseValue = value.toLowerCase()
      const exactMatchFound =
        lowerCaseValue && options.some((opt) => opt.name.toLowerCase() === lowerCaseValue)
      const lowerCaseOption = option.name.toLowerCase()
      return !exactMatchFound && lowerCaseOption.includes(lowerCaseValue)
    })
  }, [options, value])

  const shouldVirtualize = filteredOptions.length > maxVisibleItems

  const containerHeight = shouldVirtualize
    ? maxVisibleItems * itemHeight
    : filteredOptions.length * itemHeight

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  })

  if (filteredOptions.length === 0) return null

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
        <VirtualizerContainer
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const option = filteredOptions[virtualItem.index]
            return (
              <VirtualItem
                key={option.name}
                data-selected={virtualItem.index === selectedIndex}
                data-available={option.available}
                onClick={() => onSelect(option.value || option.name)}
                onMouseEnter={() => {
                  setSelectedIndex(virtualItem.index)
                }}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {option.name}
              </VirtualItem>
            )
          })}
        </VirtualizerContainer>
      ) : (
        filteredOptions.map((option, index) => (
          <NonVirtualItem
            key={option.name}
            data-selected={index === selectedIndex}
            data-available={option.available}
            onClick={() => onSelect(option.value || option.name)}
            onMouseEnter={() => {
              setSelectedIndex(index)
            }}
          >
            {option.name}
          </NonVirtualItem>
        ))
      )}
    </OptionContainer>
  )
}
