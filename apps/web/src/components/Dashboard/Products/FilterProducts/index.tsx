"use client"

import { useEffect, useRef, useState } from "react"
import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import type { SelectOption } from "@taxdom/types"
import type { ProductFilterState } from "../ProductsList"
import {
  FilterButton,
  FilterBadge,
  FilterSection,
  FilterLabel,
  SearchInput,
  SelectInput,
  FilterActions,
  FilterActionButton,
} from "./FilterProducts.styled"

interface FilterProductsProps {
  filters: ProductFilterState
  onFiltersChange: (filters: ProductFilterState) => void
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
}

export default function FilterProducts({
  filters,
  onFiltersChange,
  categories,
  origins,
  territories,
}: FilterProductsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.category !== "all" ? 1 : 0) +
    (filters.origin !== "all" ? 1 : 0) +
    (filters.territory !== "all" ? 1 : 0)

  const hasActiveFilters = activeFiltersCount > 0

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleReset = () => {
    onFiltersChange({
      search: "",
      category: "all",
      origin: "all",
      territory: "all",
    })
  }

  return (
    <div style={{ position: "relative" }}>
      <FilterButton
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        data-active={hasActiveFilters}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transition: "transform 150ms ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path d="M3 6h18M7 12h10m-7 6h4" />
        </svg>
        Filtrer
        {hasActiveFilters && <FilterBadge>{activeFiltersCount}</FilterBadge>}
      </FilterButton>

      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "var(--colors-background)",
              border: "1px solid var(--colors-dark-gray)",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
              padding: "16px",
              minWidth: "320px",
              zIndex: 50,
            }}
          >
            <FilterSection>
              <FilterLabel>Rechercher</FilterLabel>
              <SearchInput
                type="text"
                placeholder="Nom du produit..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              />
            </FilterSection>

            <FilterSection>
              <FilterLabel>Catégorie</FilterLabel>
              <SelectInput
                value={filters.category}
                onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
              >
                <option value="all">Toutes</option>
                {categories.map((c) => (
                  <option key={c.value ?? c.name} value={c.value ?? c.name}>
                    {c.name}
                  </option>
                ))}
              </SelectInput>
            </FilterSection>

            <FilterSection>
              <FilterLabel>Origine</FilterLabel>
              <SelectInput
                value={filters.origin}
                onChange={(e) => onFiltersChange({ ...filters, origin: e.target.value })}
              >
                <option value="all">Toutes</option>
                {origins.map((o) => (
                  <option key={o.value ?? o.name} value={o.value ?? o.name}>
                    {o.name}
                  </option>
                ))}
              </SelectInput>
            </FilterSection>

            <FilterSection>
              <FilterLabel>Territoire</FilterLabel>
              <SelectInput
                value={filters.territory}
                onChange={(e) => onFiltersChange({ ...filters, territory: e.target.value })}
              >
                <option value="all">Tous</option>
                {territories.map((t) => (
                  <option key={t.value ?? t.name} value={t.value ?? t.name}>
                    {t.name}
                  </option>
                ))}
              </SelectInput>
            </FilterSection>

            <FilterActions>
              <FilterActionButton
                type="button"
                data-variant="secondary"
                onClick={handleReset}
                disabled={!hasActiveFilters}
              >
                Réinitialiser
              </FilterActionButton>
              <FilterActionButton
                type="button"
                data-variant="primary"
                onClick={() => setIsOpen(false)}
              >
                Appliquer
              </FilterActionButton>
            </FilterActions>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
