FROM node:22.13.1-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.15.4 --activate

FROM base AS builder
# Check https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache gcompat

# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @taxdom/blog --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache gcompat
WORKDIR /app

ENV HUSKY=0

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build

FROM base AS deploy
WORKDIR /app

COPY --from=installer /app/apps/api/build ./


# ENV HOST=0.0.0.0
# ENV PORT=4321
# EXPOSE 4321
# CMD ["node", "./dist/server/entry.mjs"]