import pandacss from "@pandacss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  // Nitro (`node-server` preset) builds the production server into
  // .output/server/index.mjs — a self-contained Node server, run with `pnpm start`.
  plugins: [pandacss(), tanstackStart(), nitro({ preset: "node-server" }), react()],
})
