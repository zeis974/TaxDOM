# TESTING.md — The testing rule

> **This file is the rule. It applies to every change that adds or touches tests.**
> If a testing need does not fit within it, change this file first — do not work around it.

Unit tests run on **Vitest**, end-to-end tests on **Playwright**. Both are wired through Turborepo
so `pnpm test` and `pnpm test:e2e` work from the repo root.

---

## 1. The non-negotiables

1. **Import test APIs explicitly** — `import { describe, expect, it, vi } from "vitest"`. No
   globals, no `types: ["vitest/globals"]`.
2. **Never write a test that locks in a bug.** If the code disagrees with its documented intent,
   leave the case out (or mark it `it.todo` with a one-line reason) and report it. The fix is a
   separate `fix(...)` commit.
3. **Tests never need Postgres, Redis or a running API.** Unit tests import pure modules; e2e tests
   mock the API in the browser (see §4). Anything that needs the real stack is out of scope for now.
4. **Don't refactor production code just to make it testable** inside a `test(...)` commit. If a
   module needs extracting first, that's its own `refactor(...)` commit.
5. **A new test must pass on its own and alongside the others** — no ordering, no shared state, no
   real timers for anything time-based (`vi.useFakeTimers()`).

---

## 2. Layout per package

| Package | Runner | Environment | Where tests live | Config |
|---|---|---|---|---|
| `apps/api` | Vitest | node | `tests/unit/**/*.spec.ts` (+ `tests/unit/fixtures/`) | `vitest.config.ts` |
| `apps/web` | Vitest | jsdom | colocated `src/**/*.test.{ts,tsx}` | `vitest.config.ts` + `vitest.setup.ts` |
| `apps/web` | Playwright | Chromium | `e2e/*.spec.ts` | `playwright.config.ts` |
| `apps/dashboard` | Vitest | node | colocated `src/**/*.test.{ts,tsx}` | `vitest.config.ts` |
| `packages/ui` | Vitest | jsdom | colocated `src/**/*.test.{ts,tsx}` | `vitest.config.ts` + `vitest.setup.ts` |
| `packages/types` | Vitest | node | colocated `src/*.test.ts` | none — Vitest defaults |

`apps/blog` has no tests yet. To add a package, copy the closest config above, add
`"test": "vitest run"` and `"test:watch": "vitest"` to its `package.json`, and install `vitest`
as an exact devDependency (`pnpm add -DE`).

**A file whose path does not match its package's `include` glob is silently skipped** — no warning,
no failure. `apps/api` collects `tests/unit/**/*.spec.ts`; `apps/web`, `apps/dashboard` and
`packages/ui` pin `src/**/*.test.{ts,tsx}`; `packages/types` ships no config, so Vitest's default
include applies there and `src/*.test.ts` is only the local convention. Name a new file after its
neighbours.

### Package-specific notes

- **api** — the `#…` subpath imports resolve natively; no alias needed. Don't import anything that
  pulls in `#start/env`, a provider or `@adonisjs/core/services/*` at module load: tests run without
  booting Adonis. Services taking a `db` in their constructor are out of scope until their pure
  logic is extracted. The folder follows the suite layout already declared in `adonisrc.ts`.
- **dashboard** — `vitest.config.ts` is deliberately separate from `vite.config.ts`, so tests don't
  load the TanStack Start and Nitro plugins. Don't merge them. Avoid importing modules that create
  the API client at load (e.g. `src/lib/transporterRules.ts`).
- **web / ui** — React Testing Library has no auto-cleanup without globals; `vitest.setup.ts`
  registers `afterEach(cleanup)`. Components using `@/panda` need `styled-system/`, which the turbo
  `test` task generates through its `codegen` dependency. Vitest can't render `async` Server
  Components — cover those with e2e tests.

### Turborepo wiring

The `test` task depends on `codegen` and `transit`. `transit` does no work of its own —
`transit: { dependsOn: ["^transit"] }` only carries the hash of every internal workspace dependency,
so editing `packages/ui` or `packages/types` invalidates the unit-test cache of the apps that import
them instead of replaying a stale result. A new internal package needs nothing extra: once it is a
workspace dependency, `^transit` picks it up. `test:e2e` is cached the same way: it is
deterministic because the API is mocked (§4), so an unchanged web app replays its last result. Run
`pnpm test:e2e --force` to execute it regardless.

---

## 3. Unit tests

- Name the behavior, not the function: `it("rejects a bare amazon ASIN url")`.
- Prefer real inputs over mocks. Build fixtures from real data shapes (see
  `apps/api/tests/unit/fixtures/`), trimmed to the rows the test needs.
- Hooks: `renderHook` from `@testing-library/react`. Components: query by role and accessible name
  (`getByRole("button", { name: "Calculer" })`), never by class or Panda-generated selectors.

---

## 4. End-to-end tests (`apps/web`)

- Playwright runs the suite against `next dev` on **port 3100**. `webServer.env` points
  `API_URL` and `NEXT_PUBLIC_API_URL` at `http://127.0.0.1:3399`, where nothing listens, and pins
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to Cloudflare's test key; those values win over `apps/web/.env`,
  so a run never reaches a real backend. `mocks.ts` also aborts the Turnstile script, so no captcha
  token is ever produced.
- Locally Playwright reuses a server already listening on 3100, but only a server started by this
  checkout — the variables above are injected only when Playwright owns the process.
  `PLAYWRIGHT_REUSE_SERVER=0` forces a fresh one.
- **Every spec calls `mockApi(page)` from `e2e/mocks.ts` before navigating.** It is one catch-all
  dispatcher over `/v1/public/*`: one branch per endpoint, fixtures exported beside it. Add a new
  endpoint as another branch — never as a second `page.route()` glob, because Playwright matches
  the most recently registered route first and overlapping globs shadow each other. A path without
  a branch answers 503, so a missing fixture fails loudly.
- **Drive the page through `e2e/helpers.ts`.** `await waitForHydration(page)` after `page.goto()`
  waits for React's `__reactFiber$` marker; open a select with `openSelect(page, input)` and pick
  with `chooseOption(page, input, "ESPAGNE")`. Typing before hydration is lost, and a `focus()`
  that fires mid-hydration never reaches the component, so open the listbox first and `fill()` only
  when a test needs the typed filter.
- `page.route()` only intercepts **browser** requests. Server-side calls (route handlers in
  `src/app/api/*`, server actions, SSR prefetches) hit the unreachable host and fail — test those
  flows only through what the browser sees, or leave them out.
- Select with accessible roles and labels (`getByRole("combobox", { name: "Origine" })`). If an
  element has no accessible name, fix the component rather than reaching for CSS selectors.

---

## 5. Commands

```bash
pnpm test                                   # all unit tests (turbo, cached)
pnpm test:e2e                               # all e2e suites (turbo, cached)

pnpm --filter @taxdom/<pkg> test            # one package
pnpm --filter @taxdom/<pkg> test:watch      # watch mode
pnpm --filter @taxdom/<pkg> exec vitest run <path>   # one file (add -t "<name>" for one test)

pnpm --filter @taxdom/app exec playwright install chromium   # once per machine / Playwright bump
pnpm --filter @taxdom/app test:e2e
PLAYWRIGHT_REUSE_SERVER=0 pnpm --filter @taxdom/app test:e2e  # ignore a server already on 3100
pnpm --filter @taxdom/app exec playwright test e2e/<file>.spec.ts   # one spec
pnpm --filter @taxdom/app exec playwright test --ui          # debug interactively
```

`pnpm --filter @taxdom/<pkg> test` calls Vitest directly, so it skips the turbo `codegen` step;
`styled-system/` comes from `pnpm install`, whose `prepare` script runs `panda codegen`. Fall back
to the root `pnpm test` if imports from `@/panda` fail.

Artifacts (`coverage/`, `test-results/`, `playwright-report/`, `blob-report/`) are gitignored.

---

## 6. Checklist before merging a testing PR

- [ ] Test APIs imported from `vitest`; no globals, no `globals: true`.
- [ ] File sits in the package's folder and matches its `include` glob (§2).
- [ ] `it(…)` names the behavior; queries go through role and accessible name.
- [ ] No network and no infrastructure: e2e specs call `mockApi(page)` first,
      `waitForHydration(page)` after `goto`, and drive selects with `openSelect` / `chooseOption`;
      a new endpoint is a branch in `e2e/mocks.ts`, not a second `page.route()`.
- [ ] `pnpm test` passes, and the change adds no new `pnpm lint` diagnostic.
- [ ] Behavior deliberately left untested (§1.2) is reported, not asserted.
