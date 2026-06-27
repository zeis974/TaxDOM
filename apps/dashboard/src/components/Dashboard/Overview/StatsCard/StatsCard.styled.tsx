import { Link } from "@tanstack/react-router"
import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.surface);
  border-radius: token(radii.md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
  border: 1px solid token(colors.surface);
`

export const CardLink = styled(Link)`
  background: token(colors.secondaryBackground);
  border-radius: token(radii.md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid token(colors.tertiaryBackground);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 8px 20px token(colors.shadow);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const CardTitle = styled.h3`
  font-size: 0.875em;
  color: token(colors.surface);
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const CardValue = styled.p`
  font-size: 1.6em;
  font-weight: bold;
  color: token(colors.foreground);
  margin: 0;
  font-family: token(fonts.nativeFont);
`
