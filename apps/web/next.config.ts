import path from "node:path"
import url from "node:url"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(url.fileURLToPath(new URL(".", import.meta.url)), "../../"),
  typedRoutes: true,
  transpilePackages: ["@taxdom/ui", "@taxdom/types"],
  images: {
    remotePatterns: [
      new URL("https://r2.taxdom.re/images/**"),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
}

export default nextConfig
