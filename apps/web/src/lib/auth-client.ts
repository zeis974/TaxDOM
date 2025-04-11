import { createAuthClient } from "better-auth/react"

export const { signIn } = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
})
