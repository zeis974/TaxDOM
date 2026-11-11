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
RUN turbo prune @taxdom/api --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
# Production dependencies only, from the manifests: this layer survives source edits.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm --filter @taxdom/api deploy --prod /prod
COPY --from=pruner /app/out/full/ .
RUN --mount=type=cache,id=turbo,target=/app/.turbo \
    pnpm turbo run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333

COPY --from=installer --chown=node:node /prod/node_modules ./node_modules
COPY --from=installer --chown=node:node /app/apps/api/build ./
USER node

EXPOSE 3333

CMD ["node", "./bin/server.js"]
