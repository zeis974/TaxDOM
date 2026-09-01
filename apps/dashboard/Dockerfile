FROM node:24-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/dashboard/package.json ./apps/dashboard/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY apps/api/package.json ./apps/api/package.json
# --ignore-scripts: apps/dashboard's "prepare" script (panda codegen) needs
# panda.config.ts and the source tree, neither present yet at this stage — run it
# explicitly below once the full workspace is copied in.
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM deps AS build
WORKDIR /app
COPY . .
# These become part of the client (browser) bundle at build time — they must be set as
# build args per-deployment. The server-side code reads VITE_API_URL from a plain runtime
# ENV/Coolify env var on the run stage instead (see apps/dashboard/src/lib/api.ts and
# auth-server.ts), so it can change without rebuilding the image.
ARG VITE_API_URL
ARG VITE_APP_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}
RUN pnpm --filter @taxdom/dashboard prepare
# No `...` (workspace deps): packages/ui and packages/types ship raw source (no build
# step), and apps/api's registry types come from its committed .adonisjs/client output —
# building apps/api itself here is unnecessary and its `node ace build` is broken on the
# TypeScript version currently pinned in this repo (pre-existing, unrelated to this app).
RUN pnpm --filter @taxdom/dashboard build

# The build emits a self-contained Nitro 2 server in apps/dashboard/.output
# (preset `node-server`, see vite.config.ts) — dependencies are bundled, so the
# run stage only needs the .output folder and a plain Node runtime.
FROM base AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/dashboard/.output ./apps/dashboard/.output
EXPOSE 3000
WORKDIR /app/apps/dashboard
CMD ["node", ".output/server/index.mjs"]
