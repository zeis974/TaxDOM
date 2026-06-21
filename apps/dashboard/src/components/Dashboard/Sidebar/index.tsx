import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import {
  CategoriesIcon,
  CustomsTreeIcon,
  HomeIcon,
  LogoutIcon,
  OriginsIcon,
  ProductsIcon,
  TerritoriesIcon,
  TransporterIcon,
} from "@/components/Icons"
import { authClient } from "@/lib/auth-client"
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

function getInitials(name?: string | null, email?: string) {
  if (name?.trim()) {
    const [first = "", second = ""] = name.trim().split(/\s+/)
    return (first[0] ?? "") + (second[0] ?? "")
  }
  return (email?.[0] ?? "?").toUpperCase()
}

const navItems = [
  { to: "/", icon: <HomeIcon />, label: "Accueil" },
  { to: "/products", icon: <ProductsIcon />, label: "Produits" },
  { to: "/categories", icon: <CategoriesIcon />, label: "Catégories" },
  { to: "/origins", icon: <OriginsIcon />, label: "Origines" },
  { to: "/territories", icon: <TerritoriesIcon />, label: "Territoires" },
  { to: "/transporters", icon: <TransporterIcon />, label: "Transporteurs" },
  { to: "/customs-tree", icon: <CustomsTreeIcon />, label: "Nomenclatures SH" },
]

export default function Sidebar({ user }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    setIsPending(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/login" })
        },
      },
    })
    setIsPending(false)
  }

  return (
    <Container>
      <div>
        <Logo>TaxDOM</Logo>
        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <li key={item.to} data-active={isActive}>
                <Link to={item.to} aria-current={isActive ? "page" : undefined}>
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </List>
      </div>
      <UserContainer>
        <UserContentWrapper>
          <Avatar>
            {user.image ? (
              <img src={user.image} alt="Avatar" width={40} height={40} />
            ) : (
              <span aria-hidden="true">{getInitials(user.name, user.email)}</span>
            )}
          </Avatar>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
        </UserContentWrapper>
        <LogoutButton onClick={handleLogout} disabled={isPending} title="Deconnexion">
          <LogoutIcon />
        </LogoutButton>
      </UserContainer>
    </Container>
  )
}
