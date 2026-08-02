import { styled } from "@/panda/jsx"

import ThemeSettings from "@/components/Settings/ThemeSettings"

export default function Settings() {
  return (
    <div>
      <ThemeSettings />
    </div>
  )
}

const Section = styled.section`
  display: flex;
  max-width: token(sizes.maxWidth);
  margin: 0 token(spacing.s20);
  font-family: token(fonts.nativeFont);
  font-size: 1em;

  & > div {
    flex: 2;
  }

  & > h2 {
    font-family: token(fonts.nativeFont);
  }
`
