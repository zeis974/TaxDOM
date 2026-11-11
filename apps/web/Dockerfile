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
RUN turbo prune @taxdom/app --docker

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
# Inlined in the browser bundle at build time: build args (not secrets) so that changing a value
# invalidates the cached build instead of silently reusing the previous one.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_UMAMI_SCRIPT_URL
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_UMAMI_SCRIPT_URL=${NEXT_PUBLIC_UMAMI_SCRIPT_URL}
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=${NEXT_PUBLIC_UMAMI_WEBSITE_ID}
ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=cache,id=turbo,target=/app/.turbo \
    --mount=type=cache,id=next,target=/app/apps/web/.next/cache \
    pnpm turbo run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Standalone output traced from the monorepo root (see `outputFileTracingRoot` in next.config.ts).
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=installer --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
USER node

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
