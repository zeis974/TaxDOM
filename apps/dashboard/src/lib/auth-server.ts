import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"

interface ServerSession {
  user: {
    email: string
    image?: string | null
    name?: string | null
    role?: string | null
  }
}

export const getServerSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<ServerSession | null> => {
    const cookie = getRequestHeader("cookie")
    // Prefer the runtime process env (set on the deployed container, e.g. via Coolify)
    // over the build-time inlined value, so the API URL can change without a rebuild.
    const baseUrl =
      process.env.VITE_API_URL || import.meta.env.VITE_API_URL || "http://localhost:3333"

    try {
      const response = await fetch(`${baseUrl}/auth/get-session`, {
        headers: {
          Accept: "application/json",
          ...(cookie ? { cookie } : {}),
        },
      })

      if (!response.ok) {
        return null
      }

      const data = (await response.json()) as { user?: ServerSession["user"] } | null
      // Only admins use the dashboard: any other session counts as none, so both
      // layouts agree and a non-admin stays on the login page.
      return data?.user?.role === "admin" ? { user: data.user } : null
    } catch {
      // API unreachable, timed out, or returned a non-JSON body — treat as no session.
      return null
    }
  },
)
