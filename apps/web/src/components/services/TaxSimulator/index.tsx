import { styled } from "@/panda/jsx"

import TaxSimulatorForm from "./TaxSimulatorForm"
import TaxSimulatorInformations from "./TaxSimulatorInformations"

export default function TaxSimulator() {
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
  max-width: token(sizes.maxWidth);
  padding: 25px;
  margin: 0 auto;
  background: token(colors.secondaryBackground);
  border-radius: 10px;

  & > form,
  & > form ~ div {
    flex: 1;
    min-width: 50%;
  }
`
