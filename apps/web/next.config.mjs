// @ts-check

import path from "node:path"
import url from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["eslint-config-custom"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(url.fileURLToPath(new URL(".", import.meta.url)), "../../"),
  },
}

export default nextConfig
