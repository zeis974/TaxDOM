"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { tools } from "@/components/Navbar/NavLinks/tools"
import {
  Badge,
  CloseButton,
  Sheet,
  SheetBody,
  SheetHeader,
  SheetTitle,
  TabBar,
  Tile,
  TileGrid,
} from "./MobileMenu.styled"

function TabIcon({ d }: { d: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const icons = {
  rates:
    "M19 5L5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  parcel: "M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9zM3 7.5L12 12l9-4.5M12 12v9",
  tools: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  blog: "M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h5",
}

export default function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const sheetId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const close = () => setOpen(false)
  const isCurrent = (path: string) => !open && pathname === path
  const activeIndex = open ? 2 : ["/", "/simulator"].indexOf(pathname)

  return (
    <>
      <TabBar aria-label="Navigation mobile" data-active-index={activeIndex}>
        <span data-indicator aria-hidden="true" />
        <Link href="/" data-active={isCurrent("/")} aria-current={pathname === "/" && "page"}>
          <TabIcon d={icons.rates} />
          Taux
        </Link>
        <Link
          href="/simulator"
          data-active={isCurrent("/simulator")}
          aria-current={pathname === "/simulator" && "page"}
        >
          <TabIcon d={icons.parcel} />
          Colis
        </Link>
        <button
          type="button"
          data-active={open}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={sheetId}
          onClick={() => setOpen(true)}
        >
          <TabIcon d={icons.tools} />
          Outils
        </button>
        {/* The blog is a separate app, a full page load is expected */}
        <a href="/blog">
          <TabIcon d={icons.blog} />
          Blog
        </a>
      </TabBar>
      <Sheet
        ref={dialogRef}
        id={sheetId}
        aria-labelledby={titleId}
        // Escape closes the dialog natively, keep the state in sync
        onClose={close}
        // The dialog box covers the backdrop area: a click on it, not on its content, is outside
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <SheetBody>
          <SheetHeader>
            <SheetTitle id={titleId}>Outils</SheetTitle>
            <CloseButton type="button" aria-label="Fermer" onClick={close}>
              <TabIcon d="M6 6l12 12M18 6L6 18" />
            </CloseButton>
          </SheetHeader>
          <TileGrid>
            {tools.map((tool) => (
              <Tile key={tool.name}>
                {tool.slug ? (
                  <Link href={tool.slug} onClick={close}>
                    {tool.icon}
                    <span>{tool.shortName}</span>
                  </Link>
                ) : (
                  <button type="button" aria-disabled="true">
                    {tool.icon}
                    <span>{tool.shortName}</span>
                    <Badge>Bientôt</Badge>
                  </button>
                )}
              </Tile>
            ))}
          </TileGrid>
        </SheetBody>
      </Sheet>
    </>
  )
}
