export interface AuthenticatedUser {
  id: string
  email: string
}

declare module "@adonisjs/core/http" {
  interface HttpContext {
    authenticatedUser: AuthenticatedUser | null
  }
}
