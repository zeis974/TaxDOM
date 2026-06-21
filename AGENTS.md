# TaxDOM — Agent Instructions

## Stack

- **Runtime:** Node >= 24, pnpm 11.6.0, Turborepo monorepo
- **Language:** TypeScript 6.0.3 everywhere
- **Linter/formatter:** Biome 2.5.0 (no ESLint, no Prettier). No semicolons, double quotes, 100-char lines, space indent.
- **Pre-commit:** Husky + lint-staged runs `biome format --write` on staged files.

## Commands

```bash
# Infrastructure (required before API)
pnpm dev:db                    # Postgres 5432, Redis 6379, ChromaDB 8000, Ollama 11434

# Dev servers (run individually or all at once)
pnpm dev                       # all apps via turbo
pnpm dev:api                   # AdonisJS API on :3333
pnpm dev:web                   # Next.js 16 public app
pnpm dev:dashboard             # Vite + TanStack Router admin SPA

# Per-app (run from package dir or via --filter)
pnpm --filter @taxdom/<pkg> lint       # biome check
pnpm --filter @taxdom/<pkg> typecheck  # tsc --noEmit

# Database (from apps/api)
pnpm db:push                   # push schema directly (dev)
pnpm db:generate               # generate Drizzle migrations + Better Auth schema
pnpm db:migrate                # run migrations
```

## Architecture

```
apps/
  api/        @taxdom/api      AdonisJS 7, Drizzle + Postgres, Better Auth, ChromaDB + Ollama
  web/        @taxdom/app      Next.js 16, React 19 + React Compiler, Panda CSS, TanStack Query
  dashboard/  @taxdom/dashboard Vite SPA, TanStack Router (file-based), Panda CSS
  blog/       @taxdom/blog     Astro 6 + MDX + React, Panda CSS
packages/
  ui/         @taxdom/ui       Panda CSS preset (tokens, semantic tokens, keyframes, utilities)
  types/      @taxdom/types    Shared domain types (Product, Category, Origin, etc.)
tools/                         Python scripts for RITA nomenclature data import
data/rita/                     XML source data (gitignored from biome)
```

## Key gotchas

- **`@taxdom/ui` is a Panda CSS preset, not a component library.** All three frontends import it via `presets: [taxdomPreset]` and use `importMap: "@/panda"`.
- **`styled-system/` is gitignored** in every frontend. `panda codegen` runs on `pnpm prepare`; if imports from `@/panda` fail, run `pnpm install` or `pnpm prepare` in the app.
- **Drizzle migrations are gitignored** (`apps/api/database/migrations`). Use `db:push` for dev iteration; `db:generate` only when you need migration files.
- **`database/auth-schema.ts` is auto-generated** by Better Auth CLI. The `db:generate` script runs both `drizzle-kit generate` and `auth generate`. Never edit it by hand.
- **AdonisJS auto-generates `.adonisjs/`** (server indexes + Tuyau client registry) via `init` hooks in `adonisrc.ts`. Do not edit these files.
- **TanStack Router generates `routeTree.gen.ts`** in dashboard via the Vite plugin. Route files go in `apps/dashboard/src/routes/`.
- **Tuyau** generates a type-safe API client from AdonisJS route definitions. Both `web` and `dashboard` consume it via `@tuyau/core` + `@tuyau/react-query`.
- **API routes are split:** `/v1/public/*` (API key middleware) and `/v1/admin/*` (session auth middleware). Route files live in `apps/api/app/routes/{public,admin}/`.
- **React Compiler** is enabled in `apps/web` via `babel-plugin-react-compiler`.
- **Dashboard has its own `AGENTS.md`** with TanStack Router skill mappings — read it when working in `apps/dashboard/`.
- **Biome excludes:** `.adonisjs`, `.next`, `data/`, `styled-system/`, `coverage`, `dist`.
