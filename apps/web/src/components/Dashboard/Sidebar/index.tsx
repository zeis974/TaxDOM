"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

import { HomeIcon, OriginsIcon, ProductsIcon, TerritoriesIcon } from "@/components/Icons"
import { authClient } from "@/lib/auth-client"

import CategoriesIcon from "@/components/Icons/CategoriesIcon"
import LogoutIcon from "@/components/Icons/LogoutIcon"
import {
  Avatar,
  Container,
  List,
  Logo,
  LogoutButton,
  UserContainer,
  UserContentWrapper,
  UserEmail,
  UserInfo,
  UserName,
} from "./Sidebar.styled"

interface SidebarProps {
  user: {
    email: string
    image?: string | null
    name?: string | null
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/")
          },
        },
      })
    })
  }

  return (
    <Container>
      <div>
        <Logo>TaxDOM</Logo>
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
      </div>
      <UserContainer>
        <UserContentWrapper>
          <Avatar>
            {user.image ? (
              <Image src={user.image} alt="Avatar" width={40} height={40} />
            ) : (
              user.email
            )}
          </Avatar>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
        </UserContentWrapper>
        <LogoutButton onClick={handleLogout} disabled={isPending} title="Déconnexion">
          <LogoutIcon />
        </LogoutButton>
      </UserContainer>
    </Container>
  )
}
