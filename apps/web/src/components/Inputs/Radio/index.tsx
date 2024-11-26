import type { TaxSimulatorRadiosProps } from "@/services/TaxSimulator/types"

import { RadioContainer } from "./Radio.styled"

export default function Radio({
  Field,
  name,
  label,
  options,
  disabled = false,
}: TaxSimulatorRadiosProps) {
  return (
    <Field name={name}>
      {(field) => (
        <RadioContainer>
          <div>
            <span>{label}</span>
            <div>
              {options.map((option: string) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={option}
                    name={field.name}
                    value={field.state.value}
                    onClick={() => field.setValue(option)}
                    defaultChecked={field.state.value === option}
                    disabled={disabled}
                  />
                  <label htmlFor={option}>{option.toString()}</label>
                </div>
              ))}
            </div>
          </div>
        </RadioContainer>
      )}
    </Field>
  )
}
