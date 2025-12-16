import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.secondaryBackground);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid token(colors.tertiaryBackground);
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CardTitle = styled.h3`
  font-size: 0.875em;
  color: token(colors.secondary);
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const CardValue = styled.p`
  font-size: 2em;
  font-weight: bold;
  color: token(colors.primary);
  margin: 0;
  font-family: token(fonts.nativeFont);
`
