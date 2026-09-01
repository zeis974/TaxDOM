import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  // Nitro 2 (`node-server` preset) builds the production server into
  // .output/server/index.mjs — a self-contained Node server, run with `pnpm start`.
  plugins: [tanstackStart(), nitroV2Plugin({ preset: "node-server" }), react()],
})
