import { styled } from "@/panda/jsx"
import { FLAGS_BY_CODE } from "@/assets/flags"

interface CountryFlagProps {
  code?: string
  size?: number
}

export default function CountryFlag({ code, size = 18 }: CountryFlagProps) {
  const url = code && FLAGS_BY_CODE[code]
  if (!url) return null

  return (
    <FlagStyled
      style={{ width: size, height: size, backgroundImage: `url(${url})` }}
      aria-hidden="true"
    />
  )
}

const FlagStyled = styled.span`
  display: inline-block;
  margin-left: 4px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 1px token(colors.border);
`
