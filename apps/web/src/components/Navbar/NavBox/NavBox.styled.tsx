import { styled } from "@/panda/jsx"

export const Container = styled.div`
  position: absolute;
  width: calc(100% + 10px);
  z-index: 3;
  min-height: 300px;
  height: 100%;
  border-radius: 5px;
  top: -5px;
  background: white;
`

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background:#191a1b94;
  z-index: 2;
`
