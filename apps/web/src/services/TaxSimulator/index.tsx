import { styled } from "@/panda/jsx"

import TaxSimulatorForm from "@/components/TaxSimulatorForm"
import TaxSimulatorInformations from "@/components/TaxSimulatorForm/TaxSimulatorInformations"

export default function TaxSimulatorService() {
  return (
    <Section>
      <TaxSimulatorForm />
      <TaxSimulatorInformations />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  height: calc(100svh - (token(sizes.navbarHeight) + 15px));
  max-width: token(sizes.maxScreen);
  padding: 25px;
  margin: 0 auto;
  background: token(colors.secondaryBackground);
  border-radius: 10px;

  & > * {
    flex: 1;
    min-width: 50%;
  }
`
