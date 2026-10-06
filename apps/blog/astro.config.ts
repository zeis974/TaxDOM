import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import pandacss from "@pandacss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://taxdom.re/blog",
  integrations: [react(), mdx(), sitemap()],
  vite: { plugins: [pandacss()] },
})
