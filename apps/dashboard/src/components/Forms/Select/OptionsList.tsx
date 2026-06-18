import { useVirtualizer } from "@tanstack/react-virtual"
import { type MouseEvent, useCallback, useEffect, useRef } from "react"

import type { BaseOption } from "./BaseSelect"
import { NonVirtualItem, VirtualItem, VirtualizerContainer } from "./OptionsList.styled"
import { OptionContainer } from "./Select.styled"

interface OptionsListProps {
  options: BaseOption[]
  listboxId: string
  activeIndex: number
  selectedIndex: number
  onSelect: (option: BaseOption) => void
  onMouseDown?: () => void
}

interface OptionItemProps {
  option: BaseOption
  id: string
  isSelected: boolean
  isActive: boolean
  optionIndex: number
  onMouseDown?: () => void
  onSelect: (option: BaseOption) => void
  style?: React.CSSProperties
  virtual?: boolean
}

const itemHeight = 35
const maxVisibleItems = 6

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
    (event: MouseEvent) => {
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

export function OptionsList({
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
          />
        ))
      )}
    </OptionContainer>
  )
}
