import { TaxSimulatorContainer } from "@/components/Container"

import { TaxSimulatorForms as TaxForms } from "@/components/Forms"
import { TaxSimulatorInformations as TaxInformations } from "@/components/TaxSimulatorInformations"

export default function TaxSimulator() {
  return (
    <TaxSimulatorContainer>
      <TaxForms />
      <TaxInformations />
    </TaxSimulatorContainer>
  )
}
