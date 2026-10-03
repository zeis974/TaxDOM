FROM node:24.15.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs dashuser

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@12.8.1 --activate

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER dashuser
WORKDIR /app

USER root
RUN pnpm add -g turbo@2.11.4
USER dashuser

COPY --chown=dashuser:nodejs . .
RUN turbo prune @taxdom/dashboard --docker

FROM base AS installer
USER dashuser
WORKDIR /app

ENV HUSKY=0

USER root
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*
USER dashuser

COPY --chown=dashuser:nodejs .gitignore .gitignore
COPY --from=builder --chown=dashuser:nodejs /app/out/json/ .
COPY --from=builder --chown=dashuser:nodejs /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# --ignore-scripts: the `prepare` hooks (panda codegen) need the sources, which are only
# copied below. Codegen runs as the turbo `codegen` task during the build.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install --prefer-offline --ignore-scripts

COPY --from=builder --chown=dashuser:nodejs /app/out/full/ .
RUN pnpm rebuild
COPY --chown=dashuser:nodejs turbo.json turbo.json

# These become part of the client (browser) bundle at build time, so they must be set as
# build args per-deployment. The server-side code reads VITE_API_URL from a plain runtime
# ENV/Coolify env var on the run stage instead (see apps/dashboard/src/lib/api.ts and
# auth-server.ts), so it can change without rebuilding the image.
ARG VITE_API_URL
ARG VITE_APP_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}

RUN pnpm turbo run build

# The build emits a self-contained Nitro 2 server in apps/dashboard/.output
# (preset `node-server`, see vite.config.ts): dependencies are bundled, so the
# runner only needs the .output folder and a plain Node runtime.
FROM base AS runner
USER dashuser
WORKDIR /app/apps/dashboard

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=installer --chown=dashuser:nodejs /app/apps/dashboard/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
