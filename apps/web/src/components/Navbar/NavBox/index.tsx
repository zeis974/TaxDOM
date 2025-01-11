import * as m from "motion/react-m"
import { easeOut } from "motion/react"

import { Backdrop, Container } from "./NavBox.styled"

export default function NavBox() {
  return (
    <m.div
      key="navbox"
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeOut}
    >
      <Container>cc</Container>
      <Backdrop />
    </m.div>
  )
}
