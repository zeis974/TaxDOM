# CI.md — The CI and caching rule

> **This file is the rule. It applies to every change to `.github/`, `turbo.json`, a Dockerfile
> or a package script that CI runs.**
> If a need does not fit within it, change this file first — do not work around it.

Two pipelines build this repo: the **GitHub Actions workflow** (`.github/workflows/ci.yml`) checks
every pull request and every push to `main`, and the **Docker images** (`apps/*/Dockerfile`) are
built at deploy time. Both are made fast by caching; a wrong cache key ships a wrong build, so the
rules below are about correctness first.

---

## 1. The non-negotiables

1. **Every file an image copies out of a build must be a declared turbo `output`.** On a cache hit
   Turborepo restores only declared outputs, so an undeclared directory silently vanishes and the
   next `COPY --from=installer` fails. `apps/api/turbo.json` declares `build/**`,
   `apps/dashboard/turbo.json` declares `.output/**`.
2. **Every environment variable baked into a bundle must be part of the task hash** — declared in
   `env`, or covered by framework inference (`NEXT_PUBLIC_*`, `VITE_*`, Astro `PUBLIC_*`).
   Otherwise one environment's build is replayed in another.
3. **Only deterministic tasks are cached.** `test:e2e` is cacheable because the API is mocked (see
   `docs/TESTING.md` §4); a task that reads the network or the clock gets `"cache": false`.
4. **Pin third-party actions to a full commit SHA**, with the version as a trailing comment.
5. **Inside a Dockerfile, every `pnpm install` / `pnpm deploy` passes `--store-dir=/pnpm/store`**
   next to the `pnpm` cache mount. Without it pnpm keeps its store beside `node_modules` and the
   mount is never read.

---

## 2. GitHub Actions

`ci.yml` runs two jobs in parallel; both start with `.github/actions/setup`.

| Layer | Mechanism | Key / scope |
|---|---|---|
| pnpm store | `actions/setup-node` with `cache: pnpm` | `pnpm-lock.yaml` |
| Turborepo task cache | `rharkor/caching-for-turbo` serves Turborepo's remote cache API from the GitHub Actions cache, one entry per task | task hash |
| Changed packages only | `turbo run … --affected` on pull requests (`TURBO_SCM_BASE=origin/<base>`) | PR diff |
| Lint | `biome ci --changed --since=<base>` | changed files |
| Playwright browser | `actions/cache` on `~/.cache/ms-playwright` | Playwright version |
| Browser install skipped | a `--dry=json` plan counts `test:e2e` tasks that would actually run | — |

- **`main` runs everything, pull requests run `--affected`.** GitHub scopes a cache entry saved on
  a PR ref to that PR, so only runs on `main` produce entries every branch can restore.
- **`checks`** lints changed files, then runs `typecheck` and `test`. `@taxdom/dashboard` is
  filtered out of the typecheck until its pre-existing type errors are fixed — remove the filter in
  the same PR that fixes them.
- **`e2e`** installs Chromium only when a `test:e2e` task misses the cache, and uploads the
  Playwright report as an artifact when it fails.
- Biome `--changed` reports **every** error in a touched file, including old ones: a PR that edits a
  file with pre-existing lint errors has to fix them.

## 3. Docker images

| Layer | Mechanism |
|---|---|
| Unaffected app | `turbo prune <app> --docker`: an identical pruned workspace hits every later layer |
| Dependencies | `out/json` + lockfile copied before sources; `pnpm` store in the `pnpm` cache mount |
| Task outputs | `/app/.turbo/cache` cache mount (`id=turbo-<app>`) on the `turbo run build` step |
| Next.js incremental build | `apps/web/.next/cache` cache mount (`id=next-web`), where Turbopack keeps its cache |

BuildKit cache mounts live on the machine that builds the images. `docker builder prune` (or a
deploy-server cleanup job that runs it) empties them; the next build is cold but still correct.

## 4. Debugging a cache

```bash
pnpm exec turbo run <task> --dry=json     # hash, inputs, env and HIT/MISS per task, runs nothing
pnpm exec turbo run <task> --summarize    # writes .turbo/runs/<id>.json after a real run
pnpm exec turbo run <task> --force        # ignore the cache for one run
```

A task that misses when it should hit: compare two `--dry=json` outputs — the differing field
(`inputs`, `environmentVariables`, `hashOfExternalDependencies`) names the cause.

## 5. Checklist before merging a CI or caching change

- [ ] New build outputs that an image copies are declared in that app's `turbo.json`.
- [ ] New bundle-time env vars are hashed (`env` or framework prefix).
- [ ] New third-party actions are SHA-pinned.
- [ ] `actionlint` passes on `.github/workflows/`.
- [ ] A Dockerfile change was built locally at least twice (cold, then with a source change).
