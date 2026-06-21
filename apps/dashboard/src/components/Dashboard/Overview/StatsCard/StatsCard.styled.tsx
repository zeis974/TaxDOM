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
  font-size: 2em;
  font-weight: bold;
  color: token(colors.foreground);
  margin: 0;
  font-family: token(fonts.nativeFont);
`
