import { styled } from "@/panda/jsx"

export const VirtualizerContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

export const VirtualItem = styled.li`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const NonVirtualItem = styled.li`
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 5px;
`

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  min-width: 0;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .fi-fis {
    flex-shrink: 0;
  }
`
