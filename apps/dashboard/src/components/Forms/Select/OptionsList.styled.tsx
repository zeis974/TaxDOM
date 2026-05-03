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

  &[data-selected="true"] {
    background: token(colors.primary);
    color: white;
  }

  &[data-available="false"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: token(colors.primary);
    color: white;
  }
`

export const NonVirtualItem = styled.li`
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 5px;

  &[data-selected="true"] {
    background: token(colors.primary);
    color: white;
  }

  &[data-available="false"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: token(colors.primary);
    color: white;
  }
`
