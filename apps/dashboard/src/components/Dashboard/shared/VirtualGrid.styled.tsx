import { styled } from "@/styled-system/jsx"

export const VirtualContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const VirtualInner = styled.div`
  width: 100%;
  position: relative;
`

export const VirtualItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`
