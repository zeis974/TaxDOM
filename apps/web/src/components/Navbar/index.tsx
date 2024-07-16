import Link from "next/link"

import { Nav } from "./Navbar.styled"

import Misc from "@/components/Navbar/Misc"
import Search from "@/components/Navbar/Search"

export default function Navbar() {
  return (
    <Nav>
      <Link href="/">TaxDOM</Link>
      <Search />
      <Misc />
    </Nav>
  )
}
