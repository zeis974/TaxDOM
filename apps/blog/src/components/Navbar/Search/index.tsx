import { useEffect, useRef, useState } from "react"

import { SearchBar, SearchShortcut } from "./Search.styled"

import { SearchIcon } from "@/components/Icons"

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      /* Support ⌘ on MacOs keyboards */
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        if (inputRef.current?.focus()) {
          console.log("focus")
        }
      } else if (e.key === "Escape") {
        e.preventDefault()
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <SearchBar>
      <input
        placeholder="Rechercher"
        type="search"
        autoComplete="off"
        ref={inputRef}
        onFocus={() => setShowSearch(true)}
        onBlur={() => setShowSearch(false)}
        id="search"
      />
      <SearchShortcut data-focus={showSearch}>
        {showSearch ? <SearchIcon /> : <span>Ctrl + k</span>}
      </SearchShortcut>
      {/* <AnimatePresence>{showSearch && <NavBox />}</AnimatePresence> */}
    </SearchBar>
  )
}
