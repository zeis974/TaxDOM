import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const ModalContainer = styled(m.div)`
  color: token(colors.foreground);
  position: absolute;
  background: token(colors.bg);
  z-index: 10;
  padding: 20px 25px;
  border-radius: token(radii.lg);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Backdrop = styled(m.div)`
  position: fixed;
  inset: 0;
  background:#191a1b94;
  z-index: 2;
`
