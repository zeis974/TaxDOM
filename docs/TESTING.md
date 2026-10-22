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
| `packages/types` | Vitest | node | colocated `src/**/*.test.ts` | none (defaults) |

`apps/blog` has no tests yet. To add a package, copy the closest config above, add
`"test": "vitest run"` and `"test:watch": "vitest"` to its `package.json`, and install `vitest`
as an exact devDependency (`pnpm add -DE`).

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

---

## 3. Unit tests

- Name the behavior, not the function: `it("rejects a bare amazon ASIN url")`.
- Prefer real inputs over mocks. Build fixtures from real data shapes (see
  `apps/api/tests/unit/fixtures/`), trimmed to the rows the test needs.
- Hooks: `renderHook` from `@testing-library/react`. Components: query by role and accessible name
  (`getByRole("button", { name: "Calculer" })`), never by class or Panda-generated selectors.

---

## 4. End-to-end tests (`apps/web`)

- Playwright starts its own `next dev` on **port 3100** with `API_URL` and `NEXT_PUBLIC_API_URL`
  pointing to an unreachable host, so your local `.env` never leaks into e2e runs. Locally it reuses
  a server already listening on 3100.
- **Every spec calls `mockApi(page)` from `e2e/mocks.ts` before navigating.** It answers
  `/v1/public/*` from fixtures, returns 503 for anything unmocked, and blocks Cloudflare Turnstile.
  Add new endpoints there rather than inline in specs.
- `page.route()` only intercepts **browser** requests. Server-side calls (route handlers in
  `src/app/api/*`, server actions, SSR prefetches) hit the unreachable host and fail — test those
  flows only through what the browser sees, or leave them out.
- **Wait for hydration before typing.** Input typed before React attaches is lost: focus the field
  and assert a client-side reaction (e.g. the listbox opens) before `fill()`.
- Select with accessible roles and labels (`getByRole("combobox", { name: "Origine" })`). If an
  element has no accessible name, fix the component rather than reaching for CSS selectors.

---

## 5. Commands

```bash
pnpm test                                   # all unit tests (turbo, cached)
pnpm test:e2e                               # all e2e suites (turbo, not cached)

pnpm --filter @taxdom/<pkg> test            # one package
pnpm --filter @taxdom/<pkg> test:watch      # watch mode
pnpm --filter @taxdom/<pkg> exec vitest run <path>

pnpm --filter @taxdom/app exec playwright install chromium   # once per machine / Playwright bump
pnpm --filter @taxdom/app test:e2e
pnpm --filter @taxdom/app exec playwright test --ui          # debug interactively
```

Artifacts (`coverage/`, `test-results/`, `playwright-report/`, `blob-report/`) are gitignored.
