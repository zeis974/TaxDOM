import Link from "next/link"

import { Nav } from "./Navbar.styled"

import Misc from "@/components/Navbar/Misc"
import NavLinks from "@/components/Navbar/NavLinks"

export default function Navbar() {
  return (
    <Nav>
      <div>
        <Link href="/">TaxDOM</Link>
        <NavLinks />
      </div>
      <Misc />
    </Nav>
  )
}
