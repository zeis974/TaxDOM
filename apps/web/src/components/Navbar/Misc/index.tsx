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
  align-items: center;
  height: 43.2px;
  gap: 10px;
`
