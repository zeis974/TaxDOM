# TaxDOM — Agent Instructions

## Commands

```bash
# Infrastructure (required before API)
pnpm dev:db                    # Postgres 5432 (container `taxdom_db`) only
docker compose -f compose.dev.yml up -d redis  # Redis 6379, only needed with LIMITER_STORE=redis

# Tests: only the API has a suite (Japa, `node ace test`). Don't assume `pnpm test` elsewhere.
pnpm --filter @taxdom/api test # needs Postgres + a `taxdom_test` database, created once with
                               # `docker exec taxdom_db createdb -U postgres taxdom_test`
node ace test unit             # one suite (from apps/api): unit | functional
node ace test --files tests/unit/cloudflare.spec.ts  # one file; `--tests "<title>"` for one test

# Database (from apps/api)
pnpm db:push                   # push schema directly (dev)
pnpm db:generate               # generate Drizzle migrations + Better Auth schema
pnpm db:migrate                # run migrations
node ace rita:sync [--chapter N]  # sync HS nomenclatures from RITA (all 99 chapters or one)
```

## Key gotchas

- **`@taxdom/ui` is a Panda CSS preset, not a component library.** Apps consume `baseConfig` from `@taxdom/ui/preset` (it sets `presets: [taxdomPreset]` and `importMap: "@/panda"`); an app config only adds `globalCss` or overrides `hash` (blog), never the preset itself.
- **`styled-system/` is gitignored** in every frontend. `panda codegen` runs on `pnpm prepare`; if imports from `@/panda` fail, run `pnpm install` or `pnpm prepare` in the app.
- **Drizzle migrations are gitignored** (`apps/api/database/migrations`). Use `db:push` for dev iteration; `db:generate` only when you need migration files.
- **`database/auth-schema.ts` is auto-generated** by Better Auth CLI. The `db:generate` script runs both `drizzle-kit generate` and `auth generate`. Never edit it by hand.
- **AdonisJS auto-generates `.adonisjs/`** (server indexes + Tuyau client registry) via `init` hooks in `adonisrc.ts`. Do not edit these files. Route files reference controllers through `#generated/controllers`, so a new controller needs the dev server (or build) to regenerate the index.
- **Dashboard is TanStack Start, not a plain SPA.** The `tanstackStart()` Vite plugin generates `routeTree.gen.ts`; route files go in `apps/dashboard/src/routes/`. `pnpm build` emits a Nitro server in `.output/`, served by `pnpm start`. `getRouter()` in `src/router.tsx` builds a fresh `QueryClient` per request, exposes it as router context and wires `@tanstack/react-router-ssr-query`, so data prefetched in route loaders is dehydrated to the client; the `QueryClientProvider` lives in `__root.tsx`.
- **Tuyau** generates a type-safe API client from AdonisJS route definitions. Both `web` and `dashboard` consume it via `@tuyau/core` + `@tuyau/react-query`.
- **API routes are split:** `/v1/public/*` (API key middleware) and `/v1/admin/*` (session auth middleware). Route files live in `apps/api/app/routes/{public,admin}/`.
- **This Next.js version differs from your training data.** Before writing code in `apps/web`, read the relevant guide in `apps/web/node_modules/next/dist/docs/` and heed deprecation notices. `agentRules: false` in `next.config.ts` keeps `next dev` from writing `apps/web/AGENTS.md` and `apps/web/CLAUDE.md`: this root file is the only agent instructions file.
- **API tests follow the AdonisJS testing guide with Drizzle in place of Lucid.** Specs go in
  `apps/api/tests/{unit,functional}/`; `.env.test` overrides `.env`. Lucid-only helpers
  (`testUtils.db()`, `dbAssertions`) and `@adonisjs/auth` plugins don't apply: the schema is
  pushed once per run and `truncateDatabase()` from `#tests/helpers/database` resets tables and
  rate limiters in `group.each.setup()`.
- **The API suite pushes the schema and truncates every table of `DB_URL`.** An exported `DB_URL`
  wins over `.env.test`, so the helpers refuse any database not ending in `_test`. Run one suite
  at a time per test database: concurrent runs truncate each other and clash on port 3334.
- **Biome excludes:** `.adonisjs`, `.next`, `data/`, `styled-system/`, `coverage`, `dist`, `routeTree.gen.ts`, `.agents`, all `*.md`; `auth-schema.ts` is neither linted nor formatted.
- **No CI, and no root `typecheck` script.** Nothing runs lint, typecheck or tests for you: Husky's pre-commit only runs `biome format --write` on staged files. Verify with `pnpm --filter @taxdom/<app> typecheck` and `biome check <files>`: a repo-wide `pnpm lint` also reports errors unrelated to your change.

## Design system

All tokens live in `packages/ui/theme/`. Before writing or modifying any styles, read `docs/STYLING.md`. `DESIGN.md` at the root is the design spec (colors, typography) checked by `pnpm design:lint`.

## Commits & PRs

Before committing or opening a PR, read `docs/COMMITS.md`. English only, Conventional Commits, one commit per logical change, no commit body.
