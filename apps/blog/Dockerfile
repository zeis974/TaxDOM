FROM node:24.12.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs astrouser

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.26.2 --activate

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER astrouser
WORKDIR /app

USER root
RUN pnpm add -g turbo
USER astrouser

COPY --chown=astrouser:nodejs . .
RUN turbo prune @taxdom/blog --docker

FROM base AS installer
USER astrouser
WORKDIR /app

ENV HUSKY=0

USER root
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*
USER astrouser

COPY --chown=astrouser:nodejs .gitignore .gitignore
COPY --from=builder --chown=astrouser:nodejs /app/out/json/ .
COPY --from=builder --chown=astrouser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install --prefer-offline

COPY --from=builder --chown=astrouser:nodejs /app/out/full/ .
COPY --chown=astrouser:nodejs turbo.json turbo.json
RUN pnpm turbo build

FROM base AS runner
USER astrouser
WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=installer --chown=astrouser:nodejs /app/apps/blog/dist ./dist

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]