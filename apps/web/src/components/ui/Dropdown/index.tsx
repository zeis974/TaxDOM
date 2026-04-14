"use client"

import { useState, useRef, useEffect } from "react"
import { styled } from "@/panda/jsx"

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DropdownLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
  text-align: left;

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }

  &[data-open="true"] {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`

const DropdownArrow = styled.span`
  margin-left: 8px;
  transition: transform 0.2s ease;
  
  &[data-open="true"] {
    transform: rotate(180deg);
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
`

const DropdownOption = styled.button`
  display: block;
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  &[data-selected="true"] {
    background: #4f46e5;
    color: white;
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <DropdownButton type="button" onClick={() => setIsOpen(!isOpen)} data-open={isOpen}>
        <span>{displayText}</span>
        <DropdownArrow data-open={isOpen}>▼</DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              data-selected={option.value === value}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  )
}
