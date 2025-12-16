"use client"

import { Container } from "./Radio.styled"

export interface BaseRadioProps {
  id?: string
  name?: string
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  errors?: string[]
  required?: boolean
}

export default function BaseRadio({
  id,
  name,
  label,
  options,
  value,
  onChange,
  disabled = false,
  errors = [],
  required = false,
}: BaseRadioProps) {
  const groupName = name || id || label.replace(/\s+/g, "-").toLowerCase()

  return (
    <Container>
      <div>
        <span>
          {label}
          {errors.length > 0 && " "}
          {errors.length > 0 && (
            <em style={{ color: "#e74c3c", fontStyle: "normal" }}>{errors.join(", ")}</em>
          )}
        </span>
        <div role="radiogroup" aria-label={label}>
          {options.map((option) => {
            const optionId = `${groupName}-${option}`
            return (
              <div key={option}>
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(option)}
                  disabled={disabled}
                  required={required}
                />
                <label htmlFor={optionId}>{option.toString()}</label>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
