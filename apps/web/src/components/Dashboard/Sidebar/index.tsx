"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { HomeIcon, OriginsIcon, ProductsIcon, TerritoriesIcon } from "@/components/Icons"

import CategoriesIcon from "@/components/Icons/CategoriesIcon"
import { Container, List } from "./Sidebar.styled"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <Container>
      <List>
        <li data-active={pathname === "/dashboard"}>
          <Link href="/dashboard">
            <HomeIcon />
            Acceuil
          </Link>
        </li>
        <li data-active={pathname === "/dashboard/products"}>
          <Link href="/dashboard/products">
            <ProductsIcon />
            Produits
          </Link>
        </li>
        <li data-active={pathname === "/dashboard/categories"}>
          <Link href="/dashboard/categories">
            <CategoriesIcon />
            Catégories
          </Link>
        </li>
        <li data-active={pathname === "/dashboard/origins"}>
          <Link href="/dashboard/origins">
            <OriginsIcon />
            Origines
          </Link>
        </li>
        <li data-active={pathname === "/dashboard/territories"}>
          <Link href="/dashboard/territories">
            <TerritoriesIcon />
            Territoires
          </Link>
        </li>
      </List>
    </Container>
  )
}
