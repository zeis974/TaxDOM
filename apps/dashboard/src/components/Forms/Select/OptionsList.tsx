import { useVirtualizer } from "@tanstack/react-virtual"
import { type MouseEvent, useCallback, useEffect, useRef } from "react"
import CountryFlag from "@/components/ui/CountryFlag"
import type { BaseOption } from "./BaseSelect"
import {
  NonVirtualItem,
  OptionContent,
  VirtualItem,
  VirtualizerContainer,
} from "./OptionsList.styled"
import { OptionContainer } from "./Select.styled"

interface OptionsListProps {
  options: BaseOption[]
  listboxId: string
  activeIndex: number
  selectedIndex: number
  onSelect: (option: BaseOption) => void
  onHover: (index: number) => void
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
  onHover: (index: number) => void
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
  onHover,
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

  const handleMouseEnter = useCallback(() => {
    onHover(optionIndex)
  }, [onHover, optionIndex])

  const commonProps = {
    id,
    role: "option" as const,
    "aria-selected": isSelected,
    "data-option-index": optionIndex,
    "data-selected": isActive,
    "data-available": option.available,
    onMouseDown,
    onMouseEnter: handleMouseEnter,
    onClick: handleClick,
    style,
  }

  const content = (
    <OptionContent>
      {option.flag ? <CountryFlag code={option.flag} /> : null}
      <span>{option.name}</span>
    </OptionContent>
  )

  if (virtual) {
    return <VirtualItem {...commonProps}>{content}</VirtualItem>
  }

  return <NonVirtualItem {...commonProps}>{content}</NonVirtualItem>
}

export function OptionsList({
  options,
  listboxId,
  activeIndex,
  selectedIndex,
  onSelect,
  onHover,
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
                onHover={onHover}
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
            onHover={onHover}
          />
        ))
      )}
    </OptionContainer>
  )
}
