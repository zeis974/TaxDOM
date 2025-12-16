"use client"

import { useEffect, useRef, useState } from "react"
import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import { token } from "@/panda/tokens"
import type { OriginFilterState } from "../OriginsList"
import {
  FilterButton,
  FilterBadge,
  FilterSection,
  FilterLabel,
  SearchInput,
  SelectInput,
  FilterActions,
  FilterActionButton,
} from "./FilterOrigins.styled"

interface FilterOriginsProps {
  filters: OriginFilterState
  onFiltersChange: (filters: OriginFilterState) => void
}

export default function FilterOrigins({ filters, onFiltersChange }: FilterOriginsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const activeFiltersCount =
    (filters.availability !== "all" ? 1 : 0) + (filters.zone !== "all" ? 1 : 0)

  const hasActiveFilters = activeFiltersCount > 0

  // Close dropdown when clicking outside
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
      availability: "all",
      zone: "all",
    })
  }

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <SearchInput
        type="text"
        placeholder="Rechercher une origine..."
        value={filters.search}
        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        style={{ width: "250px" }}
      />
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
                background: token("colors.background"),
                border: `1px solid ${token("colors.darkGray")}`,
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
                padding: "16px",
                minWidth: "320px",
                zIndex: 50,
              }}
            >
              {/* Availability */}
              <FilterSection>
                <FilterLabel>Disponibilité</FilterLabel>
                <SelectInput
                  value={filters.availability}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      availability: e.target.value as OriginFilterState["availability"],
                    })
                  }
                >
                  <option value="all">Toutes</option>
                  <option value="available">Disponibles</option>
                  <option value="unavailable">Non disponibles</option>
                </SelectInput>
              </FilterSection>

              {/* Zone */}
              <FilterSection>
                <FilterLabel>Zone géographique</FilterLabel>
                <SelectInput
                  value={filters.zone}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      zone: e.target.value as OriginFilterState["zone"],
                    })
                  }
                >
                  <option value="all">Toutes les zones</option>
                  <option value="eu">Union Européenne</option>
                  <option value="non-eu">Hors UE</option>
                </SelectInput>
              </FilterSection>

              {/* Actions */}
              <FilterActions>
                <FilterActionButton
                  type="button"
                  data-variant="secondary"
                  onClick={handleReset}
                  disabled={!hasActiveFilters && !filters.search}
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
    </div>
  )
}
