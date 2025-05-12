"use client"

import { useEffect, useState, type JSX } from "react"

import { useTheme } from "next-themes"

import DarkModeThemeIcon from "./ThemeIcons/DarkModeThemeIcon"
import LightModeThemeIcon from "./ThemeIcons/LightModeThemeIcon"
import SystemModeThemeIcon from "./ThemeIcons/SystemModeThemeIcon"

import { Container, ThemeButton, ThemeContainer } from "./ThemeSettings.styled"

type ThemesProps = {
  name: "system" | "light" | "dark"
  label: string
  illustration: JSX.Element
}

const themes: ThemesProps[] = [
  {
    name: "system",
    label: "Système",
    illustration: <SystemModeThemeIcon />,
  },
  {
    name: "dark",
    label: "Mode sombre",
    illustration: <DarkModeThemeIcon />,
  },
  {
    name: "light",
    label: "Mode clair",
    illustration: <LightModeThemeIcon />,
  },
]

export default function ThemeSettings() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // theme is not defined on SSR, because we cannot know the theme on the server
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Container>
      <div>
        <h3>Thèmes de l&apos;interface</h3>
        <p>Personnalise le thème de l&apos;interface utilisateur</p>
      </div>
      <ThemeContainer>
        {themes.map(({ illustration, label, name }) => (
          <div key={name}>
            <ThemeButton onClick={() => setTheme(name)} data-selected={theme === name}>
              {illustration}
            </ThemeButton>
            <span>{label}</span>
          </div>
        ))}
      </ThemeContainer>
    </Container>
  )
}
