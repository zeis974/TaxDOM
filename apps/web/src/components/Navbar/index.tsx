import Link from "next/link"

import { Nav } from "./Navbar.styled"

import NavLinks from "@/components/Navbar/NavLinks"
import SettingsButton from "@/components/Navbar/SettingsButton"

export default function Navbar() {
  return (
    <Nav>
      <div>
        <Link href="/">TaxDOM</Link>
        <NavLinks />
      </div>
      <SettingsButton />
    </Nav>
  )
}
