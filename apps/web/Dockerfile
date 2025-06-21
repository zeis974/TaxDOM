FROM node:22.16.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.10.0 --activate

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER nextjs
WORKDIR /app

USER root
RUN pnpm add -g turbo
USER nextjs

COPY --chown=nextjs:nodejs . .
RUN turbo prune @taxdom/app --docker

FROM base AS installer
USER nextjs
WORKDIR /app

ENV HUSKY=0

USER root
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*
USER nextjs

COPY --chown=nextjs:nodejs .gitignore .gitignore
COPY --from=builder --chown=nextjs:nodejs /app/out/json/ .
COPY --from=builder --chown=nextjs:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder --chown=nextjs:nodejs /app/out/full/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install --prefer-offline

COPY --chown=nextjs:nodejs turbo.json turbo.json
RUN --mount=type=secret,id=NEXT_PUBLIC_TURNSTILE_SITE_KEY,env=NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_API_URL,env=NEXT_PUBLIC_API_URL \
    pnpm turbo build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/next.config.ts .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]