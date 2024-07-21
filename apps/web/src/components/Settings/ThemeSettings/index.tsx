"use client"

import { styled } from "@/panda/jsx"
import { useTheme } from "next-themes"

const THEMES = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
}

const ThemeOption = ({ theme, label }: { theme: string; label: string }) => {
  const { setTheme } = useTheme()

  return (
    <div>
      <ThemeButton onClick={() => setTheme(theme)} />
      <span>{label}</span>
    </div>
  )
}

export default function ThemesSetting() {
  return (
    <Container>
      <div>
        <h3>Thèmes de l&apos;interface</h3>
        <p>Personnalise le thème de l&apos;interface utilisateur</p>
      </div>
      <ThemeContainer>
        <ThemeOption theme={THEMES.SYSTEM} label="Préférence système" />
        <ThemeOption theme={THEMES.LIGHT} label="Light" />
        <ThemeOption theme={THEMES.DARK} label="Dark" />
      </ThemeContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  color: token(colors.primary);

  & > div:first-child {
    flex: 1;
    padding-bottom: 10px;

    & h3 {
      font-family: token(fonts.NotoSansBold);
    }
    
    & p {
      font-family: token(fonts.NotoSans);
      color: gray;
    }
  }
`

const ThemeButton = styled.button`
  width: 100%;
  min-width: 250px;
  height: 150px;
  border-radius: 8px;
  outline: none;
  border: 2px solid transparent;
  transition: 150ms border;
  margin-bottom: 10px;

  &:hover {
    border: 2px solid token(colors.primary);
  }
`

const ThemeContainer = styled.div`
  display: flex;
  flex: 2;
  font-family: token(fonts.NotoSans);

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    height: auto;
    margin: 0 10px;
  }
`
