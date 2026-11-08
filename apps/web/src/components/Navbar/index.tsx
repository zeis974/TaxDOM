import Link from "next/link"
import MobileMenu from "@/components/Navbar/MobileMenu"
import NavLinks from "@/components/Navbar/NavLinks"
import SettingsButton from "@/components/Navbar/SettingsButton"
import { Nav } from "./Navbar.styled"

export default function Navbar() {
  return (
    <Nav aria-label="Navigation principale">
      <div>
        <Link href="/">TaxDOM</Link>
        <NavLinks />
      </div>
      {/* Before the settings modal so its backdrop covers the tab bar */}
      <MobileMenu />
      <SettingsButton />
    </Nav>
  )
}
