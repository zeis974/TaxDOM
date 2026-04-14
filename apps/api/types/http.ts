export interface AuthenticatedUser {
  id: string
  email: string
  role: string | null
}

declare module "@adonisjs/core/http" {
  interface HttpContext {
    authenticatedUser: AuthenticatedUser | null
  }
}
