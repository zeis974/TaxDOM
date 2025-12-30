FROM node:24.12.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nodeuser

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.26.2 --activate

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER nodeuser
WORKDIR /app

COPY --chown=nodeuser:nodejs . .

RUN pnpm add -g turbo
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
    pnpm install --prefer-offline

COPY --from=builder --chown=nodeuser:nodejs /app/out/full/ .
COPY --chown=nodeuser:nodejs turbo.json turbo.json

RUN pnpm turbo build

FROM base AS deploy
USER nodeuser
WORKDIR /app

COPY --from=installer --chown=nodeuser:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=installer --chown=nodeuser:nodejs /app/.npmrc .npmrc
COPY --from=installer --chown=nodeuser:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nodeuser:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer --chown=nodeuser:nodejs /app/apps/api/build ./

RUN pnpm --filter=@taxdom/api deploy --prod ./output

FROM base AS runner
USER nodeuser
WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=deploy --chown=nodeuser:nodejs /app/output ./

EXPOSE 3333

CMD ["node", "./bin/server.js"]