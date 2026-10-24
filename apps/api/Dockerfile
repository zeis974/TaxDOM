FROM node:24.22.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nodeuser

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@12.14.0 --activate

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER nodeuser
WORKDIR /app

USER root
RUN pnpm add -g turbo@2.11.8
USER nodeuser

COPY --chown=nodeuser:nodejs . .
RUN turbo prune @taxdom/api --docker

FROM base AS installer
USER nodeuser
WORKDIR /app

ENV HUSKY=0
ENV PNPM_INJECT_WORKSPACE_PACKAGES=true
ENV NODE_ENV=production

USER root
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*
USER nodeuser

COPY --chown=nodeuser:nodejs .gitignore .gitignore
COPY --from=builder --chown=nodeuser:nodejs /app/out/json/ .
COPY --from=builder --chown=nodeuser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install --prefer-offline --store-dir=/pnpm/store

COPY --from=builder --chown=nodeuser:nodejs /app/out/full/ .
COPY --chown=nodeuser:nodejs turbo.json turbo.json

RUN --mount=type=cache,id=turbo-api,target=/app/.turbo/cache,uid=1001,gid=1001 \
    pnpm turbo run build

# Production dependencies only depend on the manifests and the lockfile, not on the sources:
# a code-only change reuses this stage and the runner's node_modules layer
FROM base AS prod-deps
USER nodeuser
WORKDIR /app

ENV HUSKY=0
ENV PNPM_INJECT_WORKSPACE_PACKAGES=true
ENV NODE_ENV=production

COPY --from=builder --chown=nodeuser:nodejs /app/out/json/ .
COPY --from=builder --chown=nodeuser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm --filter=@taxdom/api deploy --prod --store-dir=/pnpm/store /app/deploy

FROM base AS runner
USER nodeuser
WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=prod-deps --chown=nodeuser:nodejs /app/deploy/node_modules ./node_modules
COPY --from=installer --chown=nodeuser:nodejs /app/apps/api/build ./

EXPOSE 3333

CMD ["node", "./bin/server.js"]