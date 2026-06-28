import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  width: 100%;
  height: inherit;
  padding: 0 20px;
  margin: 0 auto;
  font-family: token(fonts.nativeFont);
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  & > span {
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0.6;
  }

  & h2 {
    font-size: 1.4rem;
    font-weight: 700;
  }

  & p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
`

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  padding: 12px 14px;
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  background: token(colors.background);
  cursor: pointer;
  transition: border-color 0.15s ease;

  & > strong {
    font-size: 0.98rem;
    font-weight: 600;
    color: token(colors.foreground);
  }

  &:hover {
    border-color: color-mix(in srgb, token(colors.primary) 12%, transparent);
  }
`

export const Rates = styled.div`
  display: flex;
  gap: 10px;
`

export const Rate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span:first-child {
    font-size: 0.95rem;
    font-weight: 700;
    color: token(colors.primary);
  }

  & > span:last-child {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    opacity: 0.6;
  }
`

export const ResetButton = styled.button`
  align-self: flex-start;
  padding: 9px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  color: token(colors.foreground);
  background: transparent;
  border: 1px solid token(colors.border);
  border-radius: token(radii.md);
  cursor: pointer;

  &:hover {
    background: token(colors.background);
  }
`
