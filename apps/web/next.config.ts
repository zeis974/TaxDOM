import type { NextConfig } from "next"
import path from "node:path"
import url from "node:url"

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(url.fileURLToPath(new URL(".", import.meta.url)), "../../"),
  typedRoutes: true,
  images: {
    remotePatterns: [new URL("https://r2.taxdom.re/images/**")],
  },
}

export default nextConfig
