import { styled } from "@/panda/jsx"

import ThemeSettings from "@/components/Settings/ThemeSettings"

export default function Settings() {
  return (
    <Section>
      <ThemeSettings />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  max-width: token(sizes.maxWidth);
  margin: 0 20px;
  font-family: token(fonts.NotoSans);
  font-size: 1em;

  & > div {
    flex: 2;
  }

  & > h2 {
    font-family: token(fonts.NotoSansBold);
  }
`
