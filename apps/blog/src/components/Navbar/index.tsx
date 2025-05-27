import { useEffect, useState } from "react"
import { Nav, ThemeSwitcher } from "./Navbar.styled"

import NavLinks from "./NavLinks"
import Search from "./Search"

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleThemeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light")
  }

  return (
    <Nav>
      <div>
        <a href="/">TaxDOM</a>
        <NavLinks />
      </div>
      <div>
        <Search />
        <ThemeSwitcher>
          <span>☀️</span>
          <input type="checkbox" checked={theme === "dark"} onChange={handleThemeSwitch} />
          <span>🌜</span>
        </ThemeSwitcher>
      </div>
    </Nav>
  )
}
