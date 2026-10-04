import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Panel = styled(m.div)`
  position: fixed;
  top: token(sizes.navbarHeight);
  left: 0;
  right: 0;
  z-index: 3;
  background: token(colors.background);
  border-bottom: 1px solid token(colors.border);
  box-shadow: 0 12px 32px token(colors.shadow);
`

export const Body = styled.div`
  display: flex;
  gap: token(spacing.lg);
  padding: token(spacing.lg) token(spacing.xl);

  @media (width < 1024px) {
    flex-direction: column;
  }
`

export const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: token(spacing.sm);
  align-content: start;

  & > a {
    border-radius: token(radii.lg);

    &:focus-visible {
      outline: 2px solid token(colors.primary);
      outline-offset: 2px;
    }
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: token(spacing.md);
  height: 100%;
  padding: token(spacing.md);
  border: 1px solid transparent;
  border-radius: token(radii.lg);
  color: token(colors.foreground);
  transition: background 150ms, border-color 150ms;

  &[data-active="true"] {
    background: color-mix(in srgb, token(colors.primary) 8%, token(colors.elevated));
    border-color: token(colors.border);
  }

  &[aria-disabled="true"] {
    opacity: 0.45;
    pointer-events: none;
  }
`

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: token(radii.lg);
  background: token(colors.elevated);

  & svg {
    width: 30px;
    height: 30px;
  }
`

export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: token(spacing.sm);
  font-size: token(fontSizes.body-md);
  font-weight: 600;
`

export const CardTitleIcon = styled.span`
  display: grid;
  flex-shrink: 0;
  color: token(colors.textMuted);
  opacity: 0;
  rotate: -90deg;
  transition: opacity 150ms, rotate 150ms;

  &[data-active="true"] {
    opacity: 1;
    rotate: 0deg;
  }
`

export const CardDescription = styled.p`
  margin-top: token(spacing.xs);
  color: token(colors.textMuted);
  font-size: token(fontSizes.body-sm);
`

export const PromoPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 300px;
  min-height: 240px;
  padding: token(spacing.lg);
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  background: color-mix(in srgb, token(colors.primary) 12%, token(colors.elevated));
  color: token(colors.foreground);
  overflow: hidden;

  @media (width < 1024px) {
    display: none;
  }
`

export const PromoContent = styled(m.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  & > div svg {
    width: 96px;
    height: 96px;
  }
`

export const PromoName = styled.p`
  max-width: 14ch;
  font-size: token(fontSizes.headline-lg);
  font-weight: 600;
`
