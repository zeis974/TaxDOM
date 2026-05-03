import { styled } from "@/panda/jsx"

export const LoadingCircle = styled.div`
  position: absolute;
  right: 12px;
  bottom: 10px;
  border: 2px solid token(colors.blue);
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
  border-radius: 8px;
  top: calc(100% + 6px);
  z-index: 1;
  position: absolute;
  border: 1px solid token(colors.darkGray);
  background: token(colors.background);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  & > li[data-selected="true"],
  & > div > li[data-selected="true"] {
    background: color-mix(in srgb, token(colors.blue) 12%, transparent);
    color: token(colors.blue);
    font-weight: 600;
  }

  & > li,
  & > div > li {
    cursor: pointer;
    display: block;
    transition: background 150ms;
    box-sizing: border-box;
    color: token(colors.primary);
    padding: 8px 12px;
    font-size: 0.9375rem;

    &:hover {
      background: token(colors.secondaryBackground);
    }

    &[data-available="false"] {
      opacity: 0.5;
    }
  }

  & > div > li {
    position: absolute;
  }

  & > li:not([style*="position: absolute"]) {
    position: relative;
  }
`
