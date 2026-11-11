FROM ghcr.io/pnpm/pnpm:12-alpine AS pnpm

FROM node:26.13.0-alpine AS base

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs astrouser

# The non-root user installs turbo globally and lets pnpm switch to the pinned version, both under PNPM_HOME.
RUN mkdir -p /pnpm && chown astrouser:nodejs /pnpm

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PNPM_HOME:$PATH"
COPY --from=pnpm /opt/pnpm /opt/pnpm
RUN for bin in pnpm pn pnpx pnx; do ln -s "/opt/pnpm/$bin" "/usr/local/bin/$bin"; done

FROM base AS builder
RUN apk update && apk add --no-cache gcompat && rm -rf /var/cache/apk/*

USER astrouser
WORKDIR /app

COPY --chown=astrouser:nodejs package.json ./
RUN pnpm add -g turbo@$(node -p "require('./package.json').devDependencies.turbo")

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

# --ignore-scripts: `prepare` (panda codegen) needs the sources, copied after the install.
# Codegen runs as the turbo `codegen` task during the build.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install --prefer-offline --ignore-scripts

COPY --from=builder --chown=astrouser:nodejs /app/out/full/ .
RUN pnpm rebuild
COPY --chown=astrouser:nodejs turbo.json turbo.json
RUN pnpm turbo run build

FROM base AS runner
USER astrouser
WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=installer --chown=astrouser:nodejs /app/apps/blog/dist ./dist

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]