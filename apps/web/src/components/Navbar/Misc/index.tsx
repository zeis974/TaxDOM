import { styled } from "@/panda/jsx"

import ChangeTools from "@/components/Navbar/Misc/ChangeTools"
import SettingsButton from "@/components/Settings/SettingsButton"

export default function Misc() {
  return (
    <Container>
      <ChangeTools />
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
