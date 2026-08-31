import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tanstackStart(), react()],
  // Deployed behind a reverse proxy (e.g. Coolify) whose domain isn't known
  // at build time, so the Host-header allowlist can't be pinned to a value.
  preview: {
    allowedHosts: true,
  },
})
