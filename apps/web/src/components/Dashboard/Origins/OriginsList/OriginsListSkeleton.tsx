"use client"

import { useEffect, useRef, useState } from "react"
import { Container, SkeletonContainer, SkeletonCard } from "./OriginsListSkeleton.styled"

const MAX_INITIAL_SKELETONS = 50 // Nombre maximum initial de skeletons

export default function OriginsListSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const skeletonContainerRef = useRef<HTMLDivElement>(null)
  const [skeletonCount, setSkeletonCount] = useState(MAX_INITIAL_SKELETONS)

  useEffect(() => {
    const calculateOptimalSkeletonCount = () => {
      if (!containerRef.current || !skeletonContainerRef.current) return

      const container = containerRef.current
      const skeletonContainer = skeletonContainerRef.current

      // Obtenir la hauteur disponible du conteneur parent
      const availableHeight =
        container.offsetHeight || container.parentElement?.offsetHeight || window.innerHeight - 250

      // Détecter s'il y a un overflow (le contenu dépasse la hauteur disponible)
      const hasOverflow = skeletonContainer.scrollHeight > availableHeight

      if (hasOverflow) {
        // Réduire progressivement le nombre de skeletons
        setSkeletonCount((prevCount) => {
          const newCount = Math.max(prevCount - 3, 6) // Réduire par 3, minimum 6
          return newCount
        })
      }
    }

    // Attendre que le DOM soit complètement rendu
    const timeoutId = setTimeout(calculateOptimalSkeletonCount, 50)

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(() => {
      // Reset au maximum lors d'un resize
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
  }, [skeletonCount]) // Re-exécuter quand skeletonCount change

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
            <div className="skeleton-count" />
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    </Container>
  )
}
