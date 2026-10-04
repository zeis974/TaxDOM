import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const ModalContainer = styled(m.div, {
  base: {
    color: "{colors.foreground}",
    position: "absolute",
    background: "{colors.background}",
    zIndex: "10",
    padding: "20px 25px",
    borderRadius: "{radii.lg}",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
})

export const Backdrop = styled(m.div, {
  base: {
    position: "fixed",
    inset: "0",
    background: "{colors.overlay}",
    zIndex: "2",
  },
})
