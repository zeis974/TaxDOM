import { styled } from "@/panda/jsx"

export const LoadingCircle = styled.div`
  position: absolute;
  right: 9px;
  bottom: 8px;
  border: 2px solid token(colors.primary);
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: rotate 1s linear infinite;
  opacity: 1;
  transition: opacity 250ms;
`

export const OptionContainer = styled.ul`
  width: 100%;
  border-radius: token(radii.sm);
  top: calc(100% + 5px);
  z-index: 1;
  position: absolute;
  border: 2px solid token(colors.border);
  background: token(colors.elevated);

  & > li[data-selected="true"],
  & > div > li[data-selected="true"] {
    background: color-mix(in srgb, token(colors.primary) 12%, transparent);
    color: token(colors.primaryHover);
  }

  & > li,
  & > div > li {
    cursor: pointer;
    display: block;
    transition: background 150ms;
    box-sizing: border-box;

    &[data-available="false"] {
      opacity: 0.5;
    }
  }

  & > div > li {
    position: absolute;
    padding: 5px;
  }

  & > li:not([style*="position: absolute"]) {
    position: relative;
    padding: 5px;
  }
`

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
