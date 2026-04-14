import { useVirtualizer } from "@tanstack/react-virtual"
import { useMemo, useRef } from "react"
import { VirtualContainer, VirtualInner, VirtualItem } from "./VirtualGrid.styled"

interface VirtualGridProps<T> {
  items: T[]
  itemHeight: number
  columns?: number
  gap?: number
  renderItem: (item: T, index: number) => React.ReactNode
}

export function VirtualGrid<T>({
  items,
  itemHeight,
  columns = 3,
  gap = 16,
  renderItem,
}: VirtualGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)

  const columnWidth = useMemo(() => {
    if (typeof window === "undefined") return 300
    const containerWidth = containerRef.current?.clientWidth ?? 900
    return Math.max(300, (containerWidth - gap * (columns - 1)) / columns)
  }, [columns, gap])

  const rows = useMemo(() => {
    const result: T[][] = []
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns))
    }
    return result
  }, [items, columns])

  const rowHeight = itemHeight + gap

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  })

  return (
    <VirtualContainer ref={containerRef}>
      <VirtualInner
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowItems = rows[virtualRow.index]
          if (!rowItems) return null

          return (
            <VirtualItem
              key={virtualRow.index}
              style={{
                height: `${rowHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "flex",
                gap: `${gap}px`,
              }}
            >
              {rowItems.map((item, colIndex) => {
                const globalIndex = virtualRow.index * columns + colIndex
                return (
                  <div key={globalIndex} style={{ flex: `0 0 ${columnWidth}px` }}>
                    {renderItem(item, globalIndex)}
                  </div>
                )
              })}
            </VirtualItem>
          )
        })}
      </VirtualInner>
    </VirtualContainer>
  )
}
