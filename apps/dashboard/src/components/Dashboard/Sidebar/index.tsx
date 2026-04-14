import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import {
  CategoriesIcon,
  HomeIcon,
  LogoutIcon,
  OriginsIcon,
  ProductsIcon,
  TerritoriesIcon,
  TransporterIcon,
} from "@/components/Icons"
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

const navItems = [
  { to: "/", icon: <HomeIcon />, label: "Accueil" },
  { to: "/products", icon: <ProductsIcon />, label: "Produits" },
  { to: "/categories", icon: <CategoriesIcon />, label: "Catégories" },
  { to: "/origins", icon: <OriginsIcon />, label: "Origines" },
  { to: "/territories", icon: <TerritoriesIcon />, label: "Territoires" },
  { to: "/transporters", icon: <TransporterIcon />, label: "Transporteurs" },
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
                <Link to={item.to}>
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
              <>{user.email}</>
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
