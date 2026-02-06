"use client"

import { useEffect, useRef, useState } from "react"
import { Container, SkeletonContainer, SkeletonCard } from "./TransportersListSkeleton.styled"

const MAX_INITIAL_SKELETONS = 50

export default function TransportersListSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const skeletonContainerRef = useRef<HTMLDivElement>(null)
  const [skeletonCount, setSkeletonCount] = useState(MAX_INITIAL_SKELETONS)

  useEffect(() => {
    const calculateOptimalSkeletonCount = () => {
      if (!containerRef.current || !skeletonContainerRef.current) return

      const container = containerRef.current
      const skeletonContainer = skeletonContainerRef.current

      const availableHeight =
        container.offsetHeight || container.parentElement?.offsetHeight || window.innerHeight - 250

      const hasOverflow = skeletonContainer.scrollHeight > availableHeight

      if (hasOverflow) {
        setSkeletonCount((prevCount) => {
          const newCount = Math.max(prevCount - 3, 6)
          return newCount
        })
      }
    }

    const timeoutId = setTimeout(calculateOptimalSkeletonCount, 50)

    const resizeObserver = new ResizeObserver(() => {
      setSkeletonCount(MAX_INITIAL_SKELETONS)
      setTimeout(calculateOptimalSkeletonCount, 50)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [skeletonCount])

  return (
    <Container ref={containerRef}>
      <SkeletonContainer ref={skeletonContainerRef} data-loading="true">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items are static
          <SkeletonCard key={index}>
            <div className="skeleton-header">
              <div className="skeleton-title" />
              <div className="skeleton-badges">
                <div className="skeleton-badge skeleton-badge-sm" />
                <div className="skeleton-badge skeleton-badge-md" />
              </div>
            </div>
            <div className="skeleton-info">
              <div className="skeleton-line skeleton-line-md" />
              <div className="skeleton-line skeleton-line-sm" />
            </div>
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    </Container>
  )
}
