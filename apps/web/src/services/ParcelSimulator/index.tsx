import { styled } from "@/panda/jsx"

import ParcelSimulator from "@/components/ParcelSimulatorForm"

export default function ParcelSimulatorService() {
  return (
    <Section>
      <ParcelSimulator />
    </Section>
  )
}

const Section = styled.section`
  width: calc(100% - 20px);
  height: calc(100svh - (token(sizes.navbarHeight) + 35px));
  max-width: token(sizes.maxWidth);
  margin: 0 auto;
  margin-top: 20px;
`
