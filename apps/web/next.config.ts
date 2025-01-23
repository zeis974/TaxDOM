import type { NextConfig } from "next"

import path from "node:path"
import url from "node:url"

const nextConfig: NextConfig = {
  transpilePackages: ["eslint-config-custom"],
  output: "standalone",
  outputFileTracingRoot: path.join(url.fileURLToPath(new URL(".", import.meta.url)), "../../"),
}

export default nextConfig
