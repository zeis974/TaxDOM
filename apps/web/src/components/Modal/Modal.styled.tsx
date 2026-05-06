import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const ModalContainer = styled(m.div)`
  color: token(colors.primary);
  position: absolute;
  background: token(colors.background);
  z-index: 10;
  padding: 20px 25px;
  border-radius: 10px;
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
