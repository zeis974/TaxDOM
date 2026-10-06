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

const FlagStyled = styled("span", {
  base: {
    display: "inline-block",
    marginLeft: "4px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexShrink: "0",
    verticalAlign: "middle",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 0 0 1px {colors.border}",
  },
})
