import "./index.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { queryClient } from "./lib/api"
import LazyMotionProvider from "./providers/LazyMotionProvider"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// biome-ignore lint/style/noNonNullAssertion: check if the root element is empty before rendering
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LazyMotionProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LazyMotionProvider>
  </StrictMode>,
)
