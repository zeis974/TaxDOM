import { styled } from "@/panda/jsx"

const flagUrls = import.meta.glob("@/assets/flags/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

const FLAGS_BY_CODE = Object.fromEntries(
  Object.entries(flagUrls).map(([path, url]) => [path.match(/([a-z]{2})\.svg$/)![1], url]),
)

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
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 1px token(colors.border);
`
