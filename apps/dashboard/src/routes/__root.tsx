import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import appCss from "@/index.css?url"
import LazyMotionProvider from "@/providers/LazyMotionProvider"

interface RouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(() => {
  const THEME_COOKIE_KEY = "theme"
  const FALLBACK_THEME = "dark"
  const VALID_THEMES = new Set(["system", "light", "dark"])
  const escapedKey = THEME_COOKIE_KEY.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&")
  const match = document.cookie.match(new RegExp(\`(?:^|;\\\\s*)\${escapedKey}=([^;]*)\`))
  let storedTheme = null
  if (match?.[1]) {
    try {
      storedTheme = decodeURIComponent(match[1])
    } catch {
      storedTheme = match[1]
    }
  }
  const selectedTheme = storedTheme && VALID_THEMES.has(storedTheme) ? storedTheme : FALLBACK_THEME
  const resolvedTheme =
    selectedTheme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : selectedTheme === "system"
        ? "light"
        : selectedTheme
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolvedTheme)
  root.setAttribute("data-theme", resolvedTheme)
  root.style.colorScheme = resolvedTheme
  root.style.backgroundColor = resolvedTheme === "dark" ? "#121212" : "#ffffff"
})()`

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Dashboard | TaxDOM" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootDocument,
  notFoundComponent: () => (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p>Page introuvable</p>
        <a href="/">Retour à l'accueil</a>
      </div>
    </div>
  ),
})

function RootDocument() {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="fr">
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme script must run before first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <LazyMotionProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            {import.meta.env.DEV && (
              <>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
              </>
            )}
          </QueryClientProvider>
        </LazyMotionProvider>
        <Scripts />
      </body>
    </html>
  )
}
