import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "@/components/Auth/Login"

export const Route = createFileRoute("/_login-layout/login")({
  component: LoginPage,
})
