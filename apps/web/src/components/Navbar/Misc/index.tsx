import { styled } from "@/panda/jsx"

import SettingsButton from "@/components/Settings/SettingsButton"

export default function Misc() {
  return (
    <Container>
      <SettingsButton />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 45px;
  gap: 10px;
`
