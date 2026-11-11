# syntax=docker/dockerfile:1
ARG NODE_VERSION=26.13.0

FROM ghcr.io/pnpm/pnpm:12.18.0-alpine AS pnpm

FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME/bin:$PNPM_HOME:$PATH
ENV CI=true
ENV HUSKY=0
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1
COPY --from=pnpm /opt/pnpm /opt/pnpm
RUN for bin in pnpm pn pnpx pnx; do ln -s "/opt/pnpm/$bin" "/usr/local/bin/$bin"; done

# Only the files the target app needs, split into manifests (cacheable install layer) and sources.
FROM base AS pruner
WORKDIR /app
COPY package.json ./
RUN pnpm add -g turbo@$(node -p "require('./package.json').devDependencies.turbo")
COPY . .
RUN turbo prune @taxdom/dashboard --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# --ignore-scripts: the `prepare` hooks (panda codegen) need the sources, which are only
# copied below. Codegen runs as the turbo `codegen` task during the build.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts
# Build the native dependencies (esbuild, sharp...) here so this layer stays cached.
RUN pnpm rebuild
COPY --from=pruner /app/out/full/ .

# These become part of the client (browser) bundle at build time, so they must be set as
# build args per-deployment. The server-side code reads VITE_API_URL from a plain runtime
# ENV/Coolify env var on the run stage instead (see apps/dashboard/src/lib/api.ts and
# auth-server.ts), so it can change without rebuilding the image.
ARG VITE_API_URL
ARG VITE_APP_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}

RUN --mount=type=cache,id=turbo,target=/app/.turbo \
    pnpm turbo run build

# The build emits a self-contained Nitro server in apps/dashboard/.output
# (preset `node-server`, see vite.config.ts): dependencies are bundled, so the
# runner only needs the .output folder and a plain Node runtime.
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=installer --chown=node:node /app/apps/dashboard/.output ./.output
USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
