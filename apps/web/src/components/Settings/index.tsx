import { styled } from "@/panda/jsx"

import ThemeSetting from "@/components/Settings/ThemeSettings"

export default function Settings() {
  return (
    <Section>
      <ThemeSetting />
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
