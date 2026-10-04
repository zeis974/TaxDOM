import { styled } from "@/panda/jsx"

import ThemeSettings from "@/components/Settings/ThemeSettings"

export default function Settings() {
  return (
    <div>
      <ThemeSettings />
    </div>
  )
}

const Section = styled("section", {
  base: {
    display: "flex",
    maxWidth: "{sizes.maxWidth}",
    margin: "0 {spacing.s20}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "1em",
    "& > div": {
      flex: "2",
    },
    "& > h2": {
      fontFamily: "{fonts.nativeFont}",
    },
  },
})
