import { styled } from "@/panda/jsx"

interface CountryFlagProps {
  code?: string
  size?: number
}

export default function CountryFlag({ code, size = 18 }: CountryFlagProps) {
  if (!code) return null

  return (
    <FlagStyled
      style={{ width: size, height: size, backgroundImage: `url(/flags/${code}.svg)` }}
      aria-hidden="true"
    />
  )
}

const FlagStyled = styled.span`
  display: inline-block;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 1px token(colors.border);
`
