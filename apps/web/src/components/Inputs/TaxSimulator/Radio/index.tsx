import type { TaxSimulatorRadiosProps } from "@/services/TaxSimulator/types"

import { RadioContainer } from "./Radio.styled"

export default function Radio({ Field, name, label, options }: TaxSimulatorRadiosProps) {
  return (
    <Field name={name}>
      {(field) => (
        <RadioContainer>
          <div>
            <span>{label}</span>
            <div>
              {options.map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={option}
                    name={field.name}
                    value={field.state.value}
                    /** Set "import" default */
                    /* 
                    onBlur={field.handleBlur}
                    onClick={() => {
                      field.handleChange(option)
                    }}
                    */
                    defaultChecked={field.state.value === option}
                    disabled
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
