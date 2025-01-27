import { Nav } from "./Navbar.styled"

import NavLinks from "./NavLinks"
import Search from "./Search"

export default function Navbar(props: any) {
  return (
    <Nav>
      <div>
        <a href="/">TaxDOM</a>
        <NavLinks />
      </div>
      <div>
        <Search />
        {props.themeSelector}
      </div>
    </Nav>
  )
}
