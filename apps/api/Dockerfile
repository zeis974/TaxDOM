FROM node:22.14.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.10.0 --activate

FROM base AS builder
# Check https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache gcompat

# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @taxdom/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

ENV HUSKY=0
ENV PNPM_INJECT_WORKSPACE_PACKAGES=true

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prefer-offline

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build

FROM base AS deploy
WORKDIR /app

COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=installer /app/.npmrc .npmrc
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer /app/apps/api/build ./

RUN pnpm --filter=@taxdom/api deploy --prod ./output

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

COPY --from=deploy /app/output ./

EXPOSE 3333
CMD ["node", "./bin/server.js"]
